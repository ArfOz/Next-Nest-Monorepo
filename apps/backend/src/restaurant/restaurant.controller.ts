import { AllowUnauthorizedRequest, StaticTokenRequired } from '@exceptions'
import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { UserParam } from '@utils'
import { UserParamsDto } from '../comments/dtos/userparams.dto'
import { AddRestaurantJsonDto } from './dtos'
import { RestaurantService } from './restaurant.service'

@Controller('restaurant')
export class RestaurantController {
	constructor(private readonly restaurantService: RestaurantService) {}

	@AllowUnauthorizedRequest()
	@Get('test')
	getData() {
		return this.restaurantService.getData()
	}

	@AllowUnauthorizedRequest()
	@Get('getall')
	getAll() {
		return this.restaurantService.getAll()
	}

	@StaticTokenRequired()
	@Post('addrestaurant')
	addRestaurant(@Body() input: AddRestaurantJsonDto) {
		return this.restaurantService.addRestaurant(input)
	}

	// @AllowUnauthorizedRequest()
	@Get('getrestaurant/:id')
	async getRestaurant(
		@Param('id') id: string,
		@UserParam() user: UserParamsDto
	) {
		return await this.restaurantService.getRestaurant(id, user)
	}
}
