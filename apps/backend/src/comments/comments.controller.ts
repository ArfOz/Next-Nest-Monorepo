import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { AddCommentsJsonDto } from './dtos';
import { CommentsService } from './comments.service';
import { AllowUnauthorizedRequest } from '@exceptions';

@Controller('comments')
export class CommentsController {
    constructor(private readonly commentsService: CommentsService) {}

    // @AllowUnauthorizedRequest()
    @Post('addcomments')
    addComments(@Body() input: AddCommentsJsonDto) {
        return this.commentsService.addComments(input);
    }

    @AllowUnauthorizedRequest()
    @Get('getcomment/:id')
    getComments(@Param('id') id: string) {
        return this.commentsService.getComment(id);
    }
}
