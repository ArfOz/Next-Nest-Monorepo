import { Injectable } from '@nestjs/common';
// import { Prisma } from '@prisma/mongo/client';
// import { PrismaServiceMongoDB } from '../prisma';
import { PrismaServiceMongoDB } from '../prisma';
import { Prisma } from '@prisma/mongo/client';

// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UsersDBService {
    constructor(private prisma: PrismaServiceMongoDB) {}

    async Create(data: Prisma.UsersCreateInput) {
        const user = await this.prisma.users.create({
            data,
            select: {
                // created: true,
                email: true
            }
        });
        return user;
    }

    async findOne(where: Prisma.UsersWhereInput) {
        return this.prisma.users.findFirst({ where });
    }
}
