import { Injectable } from '@nestjs/common';
import { PrismaServicePGDB } from '../prisma/index';
import { Prisma } from '@prisma/postgres/client';

@Injectable()
export class CommentsDBService {
    constructor(private prisma: PrismaServicePGDB) {}
    async findUnique(where: Prisma.CommentWhereUniqueInput) {
        const data = await this.prisma.comment.findUnique({ where });
        return data;
    }

    async findMany(where: Prisma.CommentWhereInput) {
        const data = await this.prisma.comment.findMany({
            where,
            select: {
                comment: true,
                star: true,
                id: true,
                title: true,
                updatedAt: true,
                user: {
                    select: {
                        username: true
                    }
                }
            }
        });

        return data;
    }

    async addComments(data: Prisma.CommentCreateInput) {
        const response = await this.prisma.comment.create({ data });
        return response;
    }

    async delete(where: Prisma.CommentWhereUniqueInput) {
        const response = await this.prisma.comment.delete({ where });
        return response;
    }
    async update({
        where,
        data
    }: {
        where: Prisma.CommentWhereUniqueInput;
        data: Prisma.CommentUpdateInput;
    }) {
        const response = await this.prisma.comment.update({ where, data });

        return response;
    }
}
