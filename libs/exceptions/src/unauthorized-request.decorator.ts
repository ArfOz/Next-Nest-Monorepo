import { SetMetadata } from '@nestjs/common'

export const AllowUnauthorizedRequest = () =>
	SetMetadata('allowUnauthorizedRequest', true)

export const AllType = () => SetMetadata('AllType', true)
