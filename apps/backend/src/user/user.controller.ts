import { AllowUnauthorizedRequest } from '@exceptions';
import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { UserRegisterJson, UserSignInJson } from './dtos';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @AllowUnauthorizedRequest()
    @Post('register')
    async Register(@Body() data: UserRegisterJson) {
        return await this.userService.Register(data);
    }

    @AllowUnauthorizedRequest()
    @Post('login')
    async Signin(@Body() data: UserSignInJson) {
        return await this.userService.Signin(data.email, data.password);
    }

    @Get('profile')
    async GetProfile(@Request() req) {
        return {
            Success: true,
            Data: req.user
        };
    }
}
