import { ArgumentsHost, Catch } from '@nestjs/common';
import { BaseWsExceptionFilter } from '@nestjs/websockets';
import { PacketType } from 'socket.io-parser';
import { Socket } from 'socket.io';

@Catch()
export class AllExceptionsSocketFilter extends BaseWsExceptionFilter {
    constructor(exception: string, client: Socket) {
        super();
        this.catch(exception, client);
    }
    override catch(exception: any, client: any) {
        client.packet({
            type: PacketType.ACK,
            data: [{ error: exception }],
            id: client.nsp._ids++
        });
    }
}
