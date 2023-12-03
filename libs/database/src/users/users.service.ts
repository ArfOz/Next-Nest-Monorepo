import { Injectable } from '@nestjs/common';
// import { Prisma } from '@prisma/mongo/client';
// import { PrismaServiceMongoDB } from '../prisma';
import { PrismaServicePGDB } from '../prisma';
import { Prisma } from '@prisma/postgres/client';

// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UsersDBService {
    constructor(private prisma: PrismaServicePGDB) {}

    async Create(data: Prisma.UserCreateInput) {
        const user = await this.prisma.user.create({
            data,
            select: {
                created: true,
                email: true
            }
        });
        return user;
    }

    async findOne(where: Prisma.UserWhereInput) {
        return this.prisma.user.findFirst({ where });
    }
}
