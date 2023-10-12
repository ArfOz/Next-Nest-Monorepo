import { Injectable } from '@nestjs/common';
import { CommentsDBService, RestaurantDBService } from '@database';
import { AddCommentsJsonDto } from './dtos';
import { Prisma } from '@prisma/client';

@Injectable()
export class CommentsService {
    constructor(
        private readonly commentDBService: CommentsDBService,
        private readonly restaurantDBService: RestaurantDBService,
    ) {}

    async addComments(data: AddCommentsJsonDto) {
        console.log('geldi');
        const response = await this.commentDBService.addComments(data);
        return response;
    }

    async getComment(commentId: string) {
        const filter: Prisma.CommentsWhereUniqueInput = {
            id: commentId,
        };
        console.log('filter', filter);
        const comment = await this.commentDBService.findUnique(filter);

        return comment;
    }
}
