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
        console.log('arif0', user);
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

        const likeNum = await this.commentLikeDBService.findMany({
            commentId: like.commentId
        });

        this.server.emit('like', {
            msg: 'User liked',
            likeNum
        });

        const alreadyLiked = await this.commentLikeDBService.findUnique({
            likeId: {
                commentId: like.commentId,
                userId: user.sub
            }
        });

        if (alreadyLiked) {
            throw new BadRequestExceptionWS('you already Liked', client);
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

        const data = await this.commentLikeDBService.addCommentsLike(likedData);

        // const likeNum = await this.commentLikeDBService.findMany({
        //     commentId: like.commentId
        // });

        // this.server.emit('like', {
        //     msg: 'User liked',
        //     likeNum
        // });
        return {
            Success: true,
            Data: data
        };
    }

    @SubscribeMessage('dislike')
    onDisliked(@MessageBody() body: any) {
        console.log(body);
        this.server.emit('dislike', {
            msg: 'User disliked',
            content: body
        });
    }

    // @SubscribeMessage('likecounts')
    // async likeCounter(
    //     @MessageBody() body: LikeDislikeCommentJsonDto,
    //     @ConnectedSocket() client: Socket
    // ) {
    //     console.log(body);

    //     if (!body.commentId) {
    //         throw new BadRequestExceptionWS('No comment Id', client);
    //     }
    //     const where: PrismaPostgres.CommentLikeWhereInput = {
    //         commentId: body.commentId
    //     };

    //     const comment = await this.commentLikeDBService.findMany(where);

    //     if (!comment) {
    //         throw new BadRequestExceptionWS('No comment', client);
    //     }

    //     this.server.emit('likecounts', {
    //         msg: 'User liked',
    //         content: body
    //     });
    // }
}
