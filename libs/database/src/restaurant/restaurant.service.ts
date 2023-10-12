import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma';
import { Prisma } from '@prisma/client';

@Injectable()
export class RestaurantDBService {
    constructor(private prisma: PrismaService) {}
    async findUnique(where: Prisma.RestaurantsWhereUniqueInput) {
        const data = await this.prisma.restaurants.findUnique({
            where: {
                id: '64f8f470cfdc52d6f006d1e4',
            },
            select: {
                id: true,
                name: true,
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
