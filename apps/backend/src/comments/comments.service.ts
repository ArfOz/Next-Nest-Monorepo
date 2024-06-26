import { Injectable } from '@nestjs/common';
import {
	CommentLikeDBService,
	CommentsDBService,
	RestaurantDBService
} from '@database';
import {
	AddCommentsJsonDto,
	DeleteCommentsJsonDto,
	LikeDislikeCommentJsonDto,
	UpdateCommentsJsonDto
} from './dtos';
import { Prisma as PrismaPostgres } from '@prisma/postgres/client';
import { Prisma as PrismaMongoDb } from '@prisma/mongo/client';
import { UserParamsDto } from './dtos/userparams.dto';
import {
	BadRequestException,
	BadRequestExceptionType,
	CommentLikeExceptionType,
	UnauthorizedException,
	UnauthorizedExceptionType
} from '@exceptions';
import { ResponseController } from '@dtos';

@Injectable()
export class CommentsService {
	constructor(
		private readonly commentDBService: CommentsDBService,
		private readonly restaurantDBService: RestaurantDBService,
		private readonly commentLikeDBService: CommentLikeDBService
	) {}

	async addComments(
		user: UserParamsDto,
		data: AddCommentsJsonDto
	): Promise<ResponseController> {
		const newData: PrismaPostgres.CommentCreateInput = {
			comment: data.comment,
			restaurantId: data.restaurantId,
			star: data.star,
			title: data.title,
			user: {
				connect: {
					id: user.sub
				}
			}
		};

		if (data.comment.length < 20) {
			throw new BadRequestException(
				BadRequestExceptionType.BAD_REQUEST,
				new Error('Comment Length Must be at Least 20 Characater'),
				404
			);
		}

		if (data.title.length < 5) {
			throw new BadRequestException(
				BadRequestExceptionType.BAD_REQUEST,
				new Error(
					'Comment Title Length Must be at Least 20 Characater'
				),
				404
			);
		}

		if (data.star < 0 || data.star > 5) {
			throw new BadRequestException(
				BadRequestExceptionType.BAD_REQUEST,
				new Error('Star Value Must be between 0-5'),
				404
			);
		}

		const restaurantData = await this.restaurantDBService.findUnique({
			id: data.restaurantId
		});

		const response = await this.commentDBService.addComments(newData);
		const updateData: PrismaMongoDb.RestaurantsUpdateArgs = {
			where: { id: data.restaurantId },
			data: {
				stars: restaurantData.stars
					? { increment: data.star }
					: data.star,
				comments: restaurantData.comments ? { increment: 1 } : 1
			}
		};

		await this.restaurantDBService.update(updateData);

		return {
			Success: true,
			Data: response
		};
	}

	async getComment(commentId: string): Promise<ResponseController> {
		const filter: PrismaPostgres.CommentWhereUniqueInput = {
			id: commentId
		};
		const comment = await this.commentDBService.findUnique(filter);

		return {
			Success: true,
			Data: comment
		};
	}

	async myComments(user: UserParamsDto): Promise<ResponseController> {
		const filter: PrismaPostgres.CommentWhereInput = {
			userId: user.sub
		};
		const comment = await this.commentDBService.findMany(filter);
		return {
			Success: true,
			Data: comment
		};
	}
	async deleteComment(
		user: UserParamsDto,
		data: DeleteCommentsJsonDto
	): Promise<ResponseController> {
		const where: PrismaPostgres.CommentWhereUniqueInput = {
			id: data.id,
			user: { id: user.sub }
		};

		const permission = await this.commentDBService.findUnique(where);

		if (!permission) {
			throw new UnauthorizedException(
				UnauthorizedExceptionType.UNAUTHORIZED_ACCESS,
				new Error('No permission to delete this comment'),
				404
			);
		}

		const updateData: PrismaMongoDb.RestaurantsUpdateArgs = {
			where: { id: permission.restaurantId },
			data: {
				stars: { decrement: permission.star },
				comments: { decrement: 1 }
			}
		};

		await this.restaurantDBService.update(updateData);

		const comment = await this.commentDBService.delete(where);
		return {
			Success: true,
			Data: comment
		};
	}

	async updateComment(
		user: UserParamsDto,
		updateData: UpdateCommentsJsonDto
	): Promise<ResponseController> {
		const where: PrismaPostgres.CommentWhereUniqueInput = {
			id: updateData.id,
			user: {
				id: user.sub
			}
		};

		const permission = await this.commentDBService.findUnique(where);

		if (!permission) {
			throw new UnauthorizedException(
				UnauthorizedExceptionType.UNAUTHORIZED_ACCESS,
				new Error('No permission to delete this comment'),
				404
			);
		}

		if (updateData.star) {
			const updateStarValue: PrismaMongoDb.RestaurantsUpdateArgs = {
				where: { id: permission.restaurantId },
				data: {
					stars: { decrement: permission.star - updateData.star }
				}
			};
			await this.restaurantDBService.update(updateStarValue);
		}

		const data: PrismaPostgres.CommentUpdateInput = {
			...updateData,
			updatedAt: new Date()
		};

		const comment = await this.commentDBService.update({
			where,
			data
		});

		return {
			Success: true,
			Data: comment
		};
	}

	async likeComment(user: UserParamsDto, like: LikeDislikeCommentJsonDto) {
		const where: PrismaPostgres.CommentWhereUniqueInput = {
			id: like.commentId
		};

		const comment = await this.commentDBService.findUnique(where);

		if (!comment) {
			throw new BadRequestException(
				BadRequestExceptionType.BAD_REQUEST,
				new Error('Comment not found!!!'),
				404
			);
		}

		const alreadyLiked = await this.commentLikeDBService.findUnique({
			likeId: {
				commentId: like.commentId,
				userId: user.sub
			}
		});

		if (alreadyLiked) {
			throw new BadRequestException(
				CommentLikeExceptionType.COMMENT_ALREADY_LIKED,
				new Error('Comment Already liked by user'),
				404
			);
		}

		const likedData: PrismaPostgres.CommentLikeCreateInput = {
			comment: {
				connect: {
					id: like.commentId
				}
			},
			user: {
				connect: {
					id: user.sub
				}
			}
		};

		const data = await this.commentLikeDBService.addCommentsLike(likedData);

		return {
			Success: true,
			Data: data
		};
	}

	async dislikeComment(
		user: UserParamsDto,
		dislike: LikeDislikeCommentJsonDto
	) {
		const where: PrismaPostgres.CommentWhereUniqueInput = {
			id: dislike.commentId
		};

		const comment = await this.commentDBService.findUnique(where);

		if (!comment) {
			throw new BadRequestException(
				BadRequestExceptionType.BAD_REQUEST,
				new Error('Comment not found!!!'),
				404
			);
		}

		const alreadyLiked = await this.commentLikeDBService.findMany({
			commentId: dislike.commentId,
			userId: user.sub
		});

		if (alreadyLiked.length < 1) {
			throw new BadRequestException(
				CommentLikeExceptionType.COMMENT_ALREADY_LIKED,
				new Error('Comments Already disliked by user'),
				404
			);
		}

		const dislikedData: PrismaPostgres.CommentLikeWhereUniqueInput = {
			likeId: {
				commentId: alreadyLiked[0].commentId,
				userId: user.sub
			}
		};

		const data = await this.commentLikeDBService.deleteCommentLike(
			dislikedData
		);

		return {
			Success: true,
			Data: data
		};
	}
}
