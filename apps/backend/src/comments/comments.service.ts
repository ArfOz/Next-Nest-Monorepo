import { Injectable } from '@nestjs/common';
import { CommentsDBService, RestaurantDBService } from '@database';
import { AddCommentsJsonDto, DeleteCommentsJsonDto } from './dtos';
import { Prisma } from '@prisma/mongo/client';
import { UserParamsDto } from './dtos/userparams.dto';
import { BadRequestException, BadRequestExceptionType } from '@exceptions';
import { ResponseController } from '@dtos';

@Injectable()
export class CommentsService {
    constructor(
        private readonly commentDBService: CommentsDBService,
        private readonly restaurantDBService: RestaurantDBService
    ) {}

    async addComments(
        user: UserParamsDto,
        data: AddCommentsJsonDto
    ): Promise<ResponseController> {
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

        if (data.stars < 0 && data.stars > 5) {
            throw new BadRequestException(
                BadRequestExceptionType.BAD_REQUEST,
                new Error('Star Value Must be between 0-5'),
                404
            );
        }
        const response = await this.commentDBService.addComments(newData);
        return {
            Success: true,
            Data: response
        };
    }

    async getComment(commentId: string): Promise<ResponseController> {
        const filter: Prisma.CommentsWhereUniqueInput = {
            id: commentId
        };
        const comment = await this.commentDBService.findUnique(filter);

        return {
            Success: true,
            Data: comment
        };
    }

    async myComments(user: UserParamsDto): Promise<ResponseController> {
        const filter: Prisma.CommentsWhereInput = {
            user_id: user.sub
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
        const where: Prisma.CommentsWhereUniqueInput = {
            id: data.id
        };
        const comment = await this.commentDBService.delete(where);
        return {
            Success: true,
            Data: comment
        };
    }
}
