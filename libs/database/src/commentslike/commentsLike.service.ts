import { Injectable } from '@nestjs/common';
import { PrismaServicePGDB } from '../prisma/index';
import { Prisma } from '@prisma/postgres/client';

@Injectable()
export class CommentLikeDBService {
    constructor(private prisma: PrismaServicePGDB) {}
    async findUnique(where: Prisma.CommentLikeWhereUniqueInput) {
        const data = await this.prisma.commentLike.findUnique({ where });
        return data;
    }

    async countComments(where: Prisma.CommentLikeWhereInput) {
        const data = await this.prisma.commentLike.count({
            where
        });

        return data;
    }

    async findMany(where: Prisma.CommentLikeWhereInput) {
        const data = await this.prisma.commentLike.findMany({
            where
        });

        return data;
    }

    async addCommentsLike(data: Prisma.CommentLikeCreateInput) {
        const response = await this.prisma.commentLike.create({ data });
        return response;
    }

    async deleteCommentLike(where: Prisma.CommentLikeWhereUniqueInput) {
        const response = await this.prisma.commentLike.delete({ where });
        return response;
    }
    // async update({
    //     where,
    //     data
    // }: {
    //     where: Prisma.CommentWhereUniqueInput;
    //     data: Prisma.CommentUpdateInput;
    // }) {
    //     const response = await this.prisma.comment.update({ where, data });

    //     return response;
    // }
}
