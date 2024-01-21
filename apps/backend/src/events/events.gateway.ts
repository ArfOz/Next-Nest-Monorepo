import { AllExceptionsSocketFilter } from '@exceptions';
import { WsGuard } from '@guard';
import { Injectable, Logger, UseFilters, UseGuards } from '@nestjs/common';
import {
    MessageBody,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@Injectable()
@WebSocketGateway(80, {
    namespace: 'events',
    cors: {
        origin: '*'
    }
})
export class EventsGateway {
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
    @UseFilters(new AllExceptionsSocketFilter())
    @SubscribeMessage('like')
    onLiked(@MessageBody() body: any) {
        console.log(body);
        this.server.emit('like', {
            msg: 'User liked',
            content: body
        });
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
