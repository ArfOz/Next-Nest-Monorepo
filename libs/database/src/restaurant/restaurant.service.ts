import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma';
import { Prisma } from '@prisma/client';

@Injectable()
export class RestaurantService {
  constructor(private prisma: PrismaService) {}
  async findUnique(where: Prisma.RestaurantsWhereUniqueInput) {
    const data = await this.prisma.restaurants.findUnique({ where });
    return null;
  }
}
