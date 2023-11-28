import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { AllowUnauthorizedRequest, StaticTokenRequired } from '@exceptions';
import { AddRestaurantJsonDto } from './dtos';

@Controller('restaurant')
export class RestaurantController {
    constructor(private readonly restaurantService: RestaurantService) {}

    @AllowUnauthorizedRequest()
    @Get('test')
    getData() {
        return this.restaurantService.getData();
    }

    @AllowUnauthorizedRequest()
    @Get('getall')
    getAll() {
        return this.restaurantService.getAll();
    }

    @StaticTokenRequired()
    @Post('addrestaurant')
    addRestaurant(@Body() input: AddRestaurantJsonDto) {
        return this.restaurantService.addRestaurant(input);
    }

    // @AllowUnauthorizedRequest()
    // @Get('getrestaurant/:id')
    // async getRestaurant(@Param('id') id: string) {
    //     return await this.restaurantService.getRestaurant(id);
    // }
}
