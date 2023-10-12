import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma';
import { Prisma } from '@prisma/client';

@Injectable()
export class CommentsDBService {
    constructor(private prisma: PrismaService) {}
    async findUnique(where: Prisma.CommentsWhereUniqueInput) {
        const data = await this.prisma.comments.findUnique({ where });
        return data;
    }

    async findMany(where: Prisma.CommentsWhereInput) {
        const data = await this.prisma.comments.findMany({
            where,
        });
        console.log('dataaaaaaaaaaa', data);
        return data;
    }

    async addComments(data: Prisma.CommentsCreateInput) {
        const response = await this.prisma.comments.create({ data });
        return response;
    }
}
