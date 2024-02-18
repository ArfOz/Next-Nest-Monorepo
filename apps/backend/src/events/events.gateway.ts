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

    private clients: Set<Socket> = new Set();
    afterInit(client: Socket) {
        this.logger.log('Initialized');
    }

    onModuleInit() {
        this.server.on('connection', (socket) => {
            console.log(socket.id);
            console.log('Connected');
        });
    }

    async handleConnection(client: Socket) {
        console.log(`Client connected: ${client.id}`);
        // client.emit('like', { selam: 'selam' });
        this.clients.add(client);
    }

    @SubscribeMessage('like')
    @UseGuards(WsGuard)
    @UseFilters(BaseWsExceptionFilter)
    async onLiked(
        @ConnectedSocket() client: Socket,
        @MessageBody() likeData: LikeDislikeCommentJsonDto,
        @UserParam() user: UserParamsDto
    ) {
        // this.server.emit('selam');
        // client.broadcast.emit('like', { selam: 'selam' });

        if (!likeData.commentId) {
            throw new BadRequestExceptionWS('No comment Id', client);
        }
        const where: PrismaPostgres.CommentWhereUniqueInput = {
            id: likeData.commentId
        };

        const comment = await this.commentDBService.findUnique(where);

        if (!comment) {
            throw new BadRequestExceptionWS('No comment', client);
        }

        const alreadyLiked = await this.commentLikeDBService.findUnique({
            likeId: {
                commentId: likeData.commentId,
                userId: user.sub
            }
        });

        if (alreadyLiked && likeData.liked) {
            throw new BadRequestExceptionWS('you already Liked', client);
        }

        if (!alreadyLiked && !likeData.liked) {
            throw new BadRequestExceptionWS('you already disliked', client);
        }

        const likedData: PrismaPostgres.CommentLikeCreateInput = {
            comment: {
                connect: {
                    id: likeData.commentId
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
                commentId: likeData.commentId,
                userId: user.sub
            }
        };

        let data;

        if (likeData.liked) {
            data = await this.commentLikeDBService.addCommentsLike(likedData);
        } else if (!likeData.liked) {
            data = await this.commentLikeDBService.deleteCommentLike(
                dislikedData
            );
        }

        const likeNum = await this.commentLikeDBService.countComments({
            commentId: likeData.commentId
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
