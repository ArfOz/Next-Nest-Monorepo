import {
    AllExceptionsSocketFilter,
    BadRequestException,
    BadRequestExceptionType,
    BadRequestExceptionWS,
    CommentLikeExceptionType
} from '@exceptions';
import { WsGuard } from '@guard';
import { Injectable, Logger, UseFilters, UseGuards } from '@nestjs/common';
import {
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

    @UseGuards(WsGuard)
    @UseFilters()
    @SubscribeMessage('like')
    async onLiked(
        @MessageBody() like: LikeDislikeCommentJsonDto,
        @UserParam() user: UserParamsDto
    ) {
        const where: PrismaPostgres.CommentWhereUniqueInput = {
            id: like.commentId
        };

        const comment = await this.commentDBService.findUnique(where);

        console.log('arif', comment);

        if (!comment) {
            throw new BadRequestException(
                BadRequestExceptionType.BAD_REQUEST,
                new Error('Comment not found!!!'),
                404
            );
        }

        const alreadyLiked = await this.commentLikeDBService.findUnique({
            likeId: {
                commentId: like.commentId,
                userId: user.sub
            }
        });
        console.log('alreadyyyyy', alreadyLiked);

        if (alreadyLiked) {
            throw new BadRequestExceptionWS(
                'hata',
                new Error('Comment Length Must be at Least 20 Characater')
            );
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

        return {
            Success: true,
            Data: data
        };

        // this.server.emit('like', {
        //     msg: 'User liked',
        //     content: like
        // });
    }

    @SubscribeMessage('dislike')
    onDisliked(@MessageBody() body: any) {
        console.log(body);
        this.server.emit('dislike', {
            msg: 'User disliked',
            content: body
        });
    }

    @SubscribeMessage('likecounts')
    likeCounter(@MessageBody() body: any) {
        console.log(body);
        this.server.emit('likecounts', {
            msg: 'User liked',
            content: body
        });
    }
}
