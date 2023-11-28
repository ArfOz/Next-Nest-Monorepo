import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/mongo/client';
import { PrismaServiceMongoDB } from '../prisma';

@Injectable()
export class RestaurantDBService {
    constructor(private prisma: PrismaServiceMongoDB) {}
    async findUnique(where: Prisma.RestaurantsWhereUniqueInput) {
        const data = await this.prisma.restaurants.findUnique({
            where
        });
        return data;
    }

    async getAll() {
        const data = await this.prisma.restaurants.findMany();
        return data;
    }

    async addRestaurant(data: Prisma.RestaurantsCreateInput) {
        const response = await this.prisma.restaurants.create({ data });
        return response;
    }
}
