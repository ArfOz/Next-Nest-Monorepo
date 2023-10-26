import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AddCommentsJsonDto, DeleteCommentsJsonDto } from './dtos';
import { CommentsService } from './comments.service';
import { AllowUnauthorizedRequest } from '@exceptions';
import { UserParamsDto } from './dtos/userparams.dto';
import { UserParam } from '@utils';

@Controller('comments')
export class CommentsController {
    constructor(private readonly commentsService: CommentsService) {}

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

    @Get('mycomments')
    async myComments(@UserParam() user: UserParamsDto) {
        return await this.commentsService.myComments(user);
    }

    @Get('deletecomment')
    async deleteComment(
        @UserParam() user: UserParamsDto,
        @Body() input: DeleteCommentsJsonDto
    ) {
        return await this.commentsService.deleteComment(user, input);
    }
}
