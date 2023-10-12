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

    async getComments(restaurantId: string) {
        const filter: Prisma.CommentsWhereInput = {
            restaurant_id: restaurantId,
        };

        const comments = await this.commentDBService.findMany(filter);
        const restaurant = await this.restaurantDBService.findUnique({
            id: restaurantId,
        });
        console.log('arif', restaurant, restaurantId);
        return restaurant;
    }
}
