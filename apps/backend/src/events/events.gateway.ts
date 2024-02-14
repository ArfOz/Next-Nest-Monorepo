// import { AllExceptionsSocketFilter } from '@exceptions';
import { WsGuard } from '@guard';
import { Injectable, Logger, UseFilters, UseGuards } from '@nestjs/common';
import {
    BaseWsExceptionFilter,
    ConnectedSocket,
    MessageBody,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
    WsException
} from '@nestjs/websockets';
import { UserParam } from '@utils';
import { Server, Socket } from 'socket.io';
import { UserParamsDto } from '../comments/dtos/userparams.dto';
import { CommentLikeDBService, CommentsDBService } from '@database';
import { Prisma as PrismaPostgres } from '@prisma/postgres/client';
import { LikeDislikeCommentJsonDto } from '../comments/dtos';
import { AllExceptionsSocketFilter, BadRequestExceptionWS } from '@exceptions';

@WebSocketGateway(80, {
    namespace: 'events',
    cors: {
        origin: '*'
    }
})
export class EventsGateway {
    constructor(
        private readonly commentDBService: CommentsDBService,
        private readonly commentLikeDBService: CommentLikeDBService
    ) {}
    @WebSocketServer() server: Server = new Server();

    private readonly logger = new Logger('Websocketgatewayyyy');

    afterInit(client: Socket) {
        this.logger.log('Initialized');
    }

    onModuleInit() {
        this.server.on('connection', (socket) => {
            console.log(socket.id);
            console.log('Connected');
        });
    }

    @SubscribeMessage('like')
    @UseGuards(WsGuard)
    @UseFilters(BaseWsExceptionFilter)
    async onLiked(
        @ConnectedSocket() client: Socket,
        @MessageBody() like: LikeDislikeCommentJsonDto,
        @UserParam() user: UserParamsDto
    ) {
        if (!like.commentId) {
            throw new BadRequestExceptionWS('No comment Id', client);
        }
        const where: PrismaPostgres.CommentWhereUniqueInput = {
            id: like.commentId
        };

        const comment = await this.commentDBService.findUnique(where);

        if (!comment) {
            throw new BadRequestExceptionWS('No comment', client);
        }

        const alreadyLiked = await this.commentLikeDBService.findUnique({
            likeId: {
                commentId: like.commentId,
                userId: user.sub
            }
        });

        if (alreadyLiked && like.liked) {
            throw new BadRequestExceptionWS('you already Liked', client);
        }

        if (!alreadyLiked && !like.liked) {
            throw new BadRequestExceptionWS('you already disliked', client);
        }

        const likedData: PrismaPostgres.CommentLikeCreateInput = {
            comment: {
                connect: {
                    id: like.commentId
                }
            },
            user: {
                connect: {
                    id: user.sub
                }
            }
        };

        const dislikedData: PrismaPostgres.CommentLikeWhereUniqueInput = {
            likeId: {
                commentId: like.commentId,
                userId: user.sub
            }
        };

        let data;

        if (like.liked) {
            data = await this.commentLikeDBService.addCommentsLike(likedData);
        } else if (!like.liked) {
            data = await this.commentLikeDBService.deleteCommentLike(
                dislikedData
            );
        }

        const likeNum = await this.commentLikeDBService.countComments({
            commentId: like.commentId
        });

        this.server.emit('like', {
            msg: 'User liked',
            likeNum
        });

        return {
            Success: true,
            Data: data.commentId
        };
    }
}
