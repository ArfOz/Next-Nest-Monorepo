import { ForbiddenException, ForbiddenExceptionType } from '@exceptions'
import { ExecutionContext, createParamDecorator } from '@nestjs/common'

export const UserParam = createParamDecorator(
	(data: string, context: ExecutionContext) => {
		const ctxType = context.getType() as string
		let ctx = null
		let req = null

		switch (ctxType) {
			case 'http':
				ctx = context.switchToHttp()
				req = ctx.getRequest()
				break

			case 'ws':
				ctx = context.switchToWs()
				req = ctx.getClient()
				break

			default:
				throw new ForbiddenException(
					ForbiddenExceptionType.FORBIDDEN,
					new Error('Token hatası'),
					500
				)
		}
		const { user } = req
		if (!user || typeof user === 'string') {
			return null
		}
		return data ? user?.[`${data}`] : user
	}
)
