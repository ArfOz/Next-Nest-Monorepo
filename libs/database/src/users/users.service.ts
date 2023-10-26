import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma';
import { Prisma } from '@prisma/client';

// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UsersDBService {
    constructor(private prisma: PrismaService) {}

    async Create(data: Prisma.UsersCreateInput) {
        const user = await this.prisma.users.create({
            data,
            select: {
                created: true,
                email: true
            }
        });
        return user;
    }

    async findOne(where: Prisma.UsersWhereInput) {
        return this.prisma.users.findFirst({ where });
    }
}
