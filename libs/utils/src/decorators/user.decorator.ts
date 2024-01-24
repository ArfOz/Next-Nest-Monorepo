import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ForbiddenException, ForbiddenExceptionType } from '@exceptions';

export const UserParam = createParamDecorator(
    (data: string, context: ExecutionContext) => {
        const ctxType = context.getType() as string;
        let ctx = null;
        let req = null;

        console.log('ctxtypessssssssss', ctxType);

        switch (ctxType) {
            case 'http':
                ctx = context.switchToHttp();
                req = ctx.getRequest().user;
                break;

            case 'ws':
                ctx = context.switchToWs();
                req = ctx;

                console.log('req user decorator', req);
                break;

            default:
                throw new ForbiddenException(
                    ForbiddenExceptionType.FORBIDDEN,
                    new Error('Token hatası'),
                    500
                );
        }
        const { user } = req;
        if (!user || typeof user === 'string') {
            return null;
        }
        return data ? user?.[`${data}`] : user;
    }
);
