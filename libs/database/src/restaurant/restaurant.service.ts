import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma';
import { Prisma } from '@prisma/client';

@Injectable()
export class RestaurantDBService {
    constructor(private prisma: PrismaService) {}
    async findUnique(where: Prisma.RestaurantsWhereUniqueInput) {
        const data = await this.prisma.restaurants.findUnique({
            where: {
                id: '6526b876396199437a7b102f',
            },
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
