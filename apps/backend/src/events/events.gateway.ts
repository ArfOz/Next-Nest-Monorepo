import { Logger } from '@nestjs/common';
import {
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway(80, { namespace: 'events' })
export class EventsGateway {
    @WebSocketServer()
    server: Server;

    private readonly logger = new Logger('Websocketgatewayyyy');

    afterInit() {
        this.logger.log('Initialized');
    }

    @SubscribeMessage('message')
    handleMessage(client: any, payload: any): string {
        return 'Hello SERverrrrrrrr';
    }

    sendMessage(client: Socket, message) {
        client.emit('selammmmmm');
        // this.server.emit('newMessage', 'heelo world from server');
    }
}
