import {
    CommentsDBService,
    RestaurantDBService,
    UsersDBService
} from '@database';
import { Injectable } from '@nestjs/common';
import { Prisma as PrismaMongoDb } from '@prisma/mongo/client';
import { Prisma as PrismaPostgresql } from '@prisma/postgres/client';
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

    async getRestaurant(restaurantId: string) {
        const restaurant = await this.restaurantDBService.findUnique({
            id: restaurantId
        });

        const where: PrismaPostgresql.CommentWhereInput = {
            restaurantId: restaurantId
        };
        const comments = await this.commentDBService.findMany(where);

        return { restaurant, comments };
    }
}
