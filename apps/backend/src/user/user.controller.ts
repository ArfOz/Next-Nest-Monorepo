import { AllowUnauthorizedRequest } from '@exceptions';
import {
    Body,
    Controller,
    Get,
    Post,
    Request,
    UseGuards
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserSignInJson } from './dtos';
import { AuthGuard } from '@guard';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @AllowUnauthorizedRequest()
    @Post('login')
    async signin(@Body() data: UserSignInJson) {
        return await this.userService.signin(data.username, data.password);
    }

    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }
}
