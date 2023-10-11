import { Body, Controller, Post } from '@nestjs/common';
import { AddCommentsJsonDto } from './dtos';
import { CommentsService } from './comments.service';

@Controller('comments')
export class CommentsController {
    constructor(private readonly commentsService: CommentsService) {}
    @Post('addcomments')
    addRestaurant(@Body() input: AddCommentsJsonDto) {
        return this.commentsService.addRestaurant(input);
    }
}
