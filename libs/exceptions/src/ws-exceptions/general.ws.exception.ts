import { ArgumentsHost, Catch, HttpException } from '@nestjs/common';
import { BaseWsExceptionFilter, WsException } from '@nestjs/websockets';
import { PacketType } from 'socket.io-parser';

// @Catch()
// export class AllExceptionsSocketFilter extends BaseWsExceptionFilter {
//     type: string;
//     error: Error;
//     host: ArgumentsHost;

//     constructor(type: string, error: any) {
//         super();
//         super.catch(error.message, this.host);
//     }
//     // super(this.catch(type:Error, host:ArgumentsHost));
//     // }

//     // override catch(type: any, host: ArgumentsHost) {
//     //     super.catch(type, host);
//     // }

//     //    catch(exception: any, host: ArgumentsHost) {
//     //       const client = host.switchToWs().getClient();
//     //       client.packet({
//     //           type: PacketType.ACK,
//     //           data: [{ error: exception?.message }],
//     //           id: client.nsp._ids++,
//     //       });
//     //    }

//     // catch(exception: any, host: ArgumentsHost) {
//     //     const args = host.getArgs();
//     //     // event ack callback
//     //     if ('function' === typeof args[args.length - 1]) {
//     //         const ACKCallback = args.pop();
//     //         ACKCallback({ error: exception.message, exception });
//     //     }
//     // }
// }

@Catch()
export class AllExceptionsSocketFilter extends BaseWsExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        const client = host.switchToWs().getClient() as WebSocket;
        const data = host.switchToWs().getData();
        const error =
            exception instanceof WsException
                ? exception.getError()
                : exception.getResponse();

        const details =
            error instanceof Object ? { ...error } : { message: error };

        client.send(
            JSON.stringify({
                event: 'error',
                data: {
                    id: (client as any).id,
                    rid: data.rid,
                    ...details
                }
            })
        );
    }

    // catch(exception: any, host: ArgumentsHost) {
    //     const client = host.switchToWs().getClient();
    //     client.packet({
    //         type: PacketType.ACK,
    //         data: [{ error: exception?.message }],
    //         id: client.nsp._ids++
    //     });
    // }
}
