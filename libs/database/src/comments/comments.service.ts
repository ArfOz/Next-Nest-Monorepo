import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma';
import { Prisma } from '@prisma/client';

@Injectable()
export class CommentsDBService {
    constructor(private prisma: PrismaService) {}
    // async findUnique(where: Prisma.CommentssWhereUniqueInput) {
    //     const data = await this.prisma.Commentss.findUnique({ where });
    //     return data;
    // }

    // async getAll() {
    //     const data = await this.prisma.Commentss.findMany();
    //     return data;
    // }

    async addComments(data: Prisma.CommentsCreateInput) {
        const response = await this.prisma.comments.create({ data });
        return response;
    }
}
