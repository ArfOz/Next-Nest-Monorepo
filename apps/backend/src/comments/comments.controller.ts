import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { AddCommentsJsonDto } from './dtos';
import { CommentsService } from './comments.service';
import { AllowUnauthorizedRequest } from '@exceptions';
import { UserParamsDto } from './dtos/userparams.dto';
import { UserParam } from '@utils';

@Controller('comments')
export class CommentsController {
    constructor(private readonly commentsService: CommentsService) {}

    // @AllowUnauthorizedRequest()
    @Post('addcomments')
    addComments(
        @UserParam() user: UserParamsDto,
        @Body() input: AddCommentsJsonDto
    ) {
        return this.commentsService.addComments(user, input);
    }

    @AllowUnauthorizedRequest()
    @Get('getcomment/:id')
    getComments(@UserParam() user: UserParamsDto, @Param('id') id: string) {
        return this.commentsService.getComment(id);
    }
}
