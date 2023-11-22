import { Injectable } from '@nestjs/common';
import { CommentsDBService, RestaurantDBService } from '@database';
import { AddCommentsJsonDto, DeleteCommentsJsonDto } from './dtos';
import { Prisma } from '@prisma/client';
import { UserParamsDto } from './dtos/userparams.dto';
import { BadRequestException, BadRequestExceptionType } from '@exceptions';

@Injectable()
export class CommentsService {
    constructor(
        private readonly commentDBService: CommentsDBService,
        private readonly restaurantDBService: RestaurantDBService
    ) {}

    async addComments(user: UserParamsDto, data: AddCommentsJsonDto) {
        const newData: Prisma.CommentsCreateInput = {
            ...data,
            user_id: user.sub
        };

        if (data.comment.length < 20) {
            throw new BadRequestException(
                BadRequestExceptionType.BAD_REQUEST,
                new Error('Comment Length Must be at Least 20 Characater'),
                404
            );
        }

        if (data.name.length < 5) {
            throw new BadRequestException(
                BadRequestExceptionType.BAD_REQUEST,
                new Error(
                    'Comment Title Length Must be at Least 20 Characater'
                ),
                404
            );
        }

        if (data.stars <= 5 && data.stars >= 0) {
            throw new BadRequestException(
                BadRequestExceptionType.BAD_REQUEST,
                new Error('Star Value Must be between 0-5'),
                404
            );
        }
        const response = await this.commentDBService.addComments(newData);
        return response;
    }

    async getComment(commentId: string) {
        const filter: Prisma.CommentsWhereUniqueInput = {
            id: commentId
        };
        const comment = await this.commentDBService.findUnique(filter);

        return comment;
    }

    async myComments(user: UserParamsDto) {
        const filter: Prisma.CommentsWhereInput = {
            user_id: user.sub
        };
        const comment = await this.commentDBService.findMany(filter);
        return comment;
    }
    async deleteComment(user: UserParamsDto, data: DeleteCommentsJsonDto) {
        const where: Prisma.CommentsWhereUniqueInput = {
            id: data.id
        };
        const comment = await this.commentDBService.delete(where);
        return comment;
    }
}
