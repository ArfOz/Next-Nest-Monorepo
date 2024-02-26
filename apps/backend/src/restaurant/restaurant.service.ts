import {
	CommentsDBService,
	RestaurantDBService,
	UsersDBService
} from '@database'
import { Injectable } from '@nestjs/common'
import { Prisma as PrismaPostgresql } from '@prisma/postgres/client'
import { UserParamsDto } from '../comments/dtos/userparams.dto'
import { AddRestaurantJsonDto } from './dtos'

@Injectable()
export class RestaurantService {
	constructor(
		private readonly commentDBService: CommentsDBService,
		private readonly restaurantDBService: RestaurantDBService,
		private readonly userDbService: UsersDBService
	) {}

	getData(): { message: string } {
		return { message: 'Hello API' }
	}

	async getAll() {
		const data = await this.restaurantDBService.getAll()
		return {
			Success: true,
			Data: data
		}
	}

	async addRestaurant(data: AddRestaurantJsonDto) {
		const response = await this.restaurantDBService.addRestaurant(data)
		return {
			Success: true,
			Data: response
		}
	}

	async getRestaurant(restaurantId: string, user: UserParamsDto) {
		const where: PrismaPostgresql.CommentWhereInput = {
			restaurantId: restaurantId
		}

		const [restaurant, comments] = await Promise.all([
			this.restaurantDBService.findUnique({
				id: restaurantId
			}),
			this.commentDBService.findMany(where)
		])

		return {
			Success: true,
			Data: { restaurant, comments }
		}
	}
}
