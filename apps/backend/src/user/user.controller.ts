import { AllowUnauthorizedRequest } from '@exceptions';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserSignInJson } from './dtos';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @AllowUnauthorizedRequest()
    @Post('signin')
    async getAll(@Body() data: UserSignInJson) {
        return await this.userService.signin(data.username, data.password);
    }
}
