import { ArgumentsHost, Catch } from '@nestjs/common';
import { BaseWsExceptionFilter, WsException } from '@nestjs/websockets';
import { PacketType } from 'socket.io-parser';
@Catch()
export class AllExceptionsSocketFilter extends BaseWsExceptionFilter {
    type: string;
    error: Error;

    constructor(type: string, error: Error) {
        super(type, host);
    }

    override catch(type: unknown, host: ArgumentsHost) {
        super.catch(type, host);
    }

    //    catch(exception: any, host: ArgumentsHost) {
    //       const client = host.switchToWs().getClient();
    //       client.packet({
    //           type: PacketType.ACK,
    //           data: [{ error: exception?.message }],
    //           id: client.nsp._ids++,
    //       });
    //    }

    // catch(exception: any, host: ArgumentsHost) {
    //     const args = host.getArgs();
    //     // event ack callback
    //     if ('function' === typeof args[args.length - 1]) {
    //         const ACKCallback = args.pop();
    //         ACKCallback({ error: exception.message, exception });
    //     }
    // }
}
