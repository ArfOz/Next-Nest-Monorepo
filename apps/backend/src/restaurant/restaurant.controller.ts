import { AllowUnauthorizedRequest } from './../../../../libs/exceptions/src/unauthorized-request.decorator';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { StaticTokenRequired } from '@exceptions';

@Controller('restaurant')
export class RestaurantController {
    constructor(private readonly restaurantService: RestaurantService) {}

    @AllowUnauthorizedRequest()
    @Get('getrestaurant')
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
    addRestaurant(@Body() input: any) {
        return this.restaurantService.addRestaurant(input);
    }
}
