import {
    CommentsDBService,
    RestaurantDBService,
    UsersDBService
} from '@database';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/mongo/client';
import { AddRestaurantJsonDto } from './dtos';

@Injectable()
export class RestaurantService {
    constructor(
        private readonly commentDBService: CommentsDBService,
        private readonly restaurantDBService: RestaurantDBService,
        private readonly userDbService: UsersDBService
    ) {}

    getData(): { message: string } {
        return { message: 'Hello API' };
    }

    async getAll() {
        const data = await this.restaurantDBService.getAll();
        return data;
    }

    async addRestaurant(data: AddRestaurantJsonDto) {
        const response = await this.restaurantDBService.addRestaurant(data);
        return response;
    }

    // async getRestaurant(restaurantId: string) {
    //     const restaurant = await this.restaurantDBService.findUnique({
    //         id: restaurantId
    //     });

    //     const where: Prisma.CommentsWhereInput = {
    //         restaurant_id: restaurantId
    //     };
    //     const comments = await this.commentDBService.findMany(where);

    //     //For this type of data SQL type database better...
    //     for (let i = 0; i < comments.length; i++) {
    //         const user = await this.userDbService.findOne({
    //             id: comments[i].user_id
    //         });

    //         comments[i].user_id = user.username;
    //     }
    //     return { restaurant, comments };
    // }
}
