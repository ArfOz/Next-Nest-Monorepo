import { Injectable } from '@nestjs/common';
import { PrismaServiceMongoDB } from '../prisma/index';
import { Prisma } from '@prisma/mongo/client';

@Injectable()
export class CommentsDBService {
    constructor(private prisma: PrismaServiceMongoDB) {}
    async findUnique(where: Prisma.CommentsWhereUniqueInput) {
        const data = await this.prisma.comments.findUnique({ where });
        return data;
    }

    async findMany(where: Prisma.CommentsWhereInput) {
        const data = await this.prisma.comments.findMany({
            where
        });

        return data;
    }

    async addComments(data: Prisma.CommentsCreateInput) {
        const response = await this.prisma.comments.create({ data });
        return response;
    }

    async delete(where: Prisma.CommentsWhereUniqueInput) {
        const response = await this.prisma.comments.delete({ where });
        return response;
    }
}
