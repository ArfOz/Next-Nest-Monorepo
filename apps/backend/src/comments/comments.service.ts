import { Injectable } from '@nestjs/common';
import { CommentsDBService, RestaurantDBService } from '@database';
import { AddCommentsJsonDto, DeleteCommentsJsonDto } from './dtos';
import { Prisma } from '@prisma/client';
import { UserParamsDto } from './dtos/userparams.dto';

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
