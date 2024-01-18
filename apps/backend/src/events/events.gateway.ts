import { AuthGuard } from '@guard';
import { Injectable, Logger, UseGuards } from '@nestjs/common';
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
// @UseGuards(AuthGuard)
export class EventsGateway {
    @WebSocketServer()
    server: Server;

    private readonly logger = new Logger('Websocketgatewayyyy');

    afterInit() {
        this.logger.log('Initialized');
    }

    onModuleInit() {
        this.server.on('connection', (socket) => {
            console.log(socket.id);
            console.log('Connected');
        });
    }

    @SubscribeMessage('like')
    onLiked(@MessageBody() body: any) {
        console.log(body);
        this.server.emit('like', {
            msg: 'User liked',
            content: body
        });
    }

    @SubscribeMessage('like')
    onDisliked(@MessageBody() body: any) {
        console.log(body);
        this.server.emit('dislike', {
            msg: 'User disliked',
            content: body
        });
    }
}
