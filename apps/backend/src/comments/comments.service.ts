import { Injectable } from '@nestjs/common';
import { CommentsDBService, RestaurantDBService } from '@database';
import { AddCommentsJsonDto } from './dtos';
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
        console.log('new data', newData);
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
}
