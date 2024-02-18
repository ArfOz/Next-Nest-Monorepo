import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import {
	AddCommentsJsonDto,
	DeleteCommentsJsonDto,
	LikeDislikeCommentJsonDto,
	UpdateCommentsJsonDto
} from './dtos';
import { CommentsService } from './comments.service';
import { AllowUnauthorizedRequest } from '@exceptions';
import { UserParamsDto } from './dtos/userparams.dto';
import { UserParam } from '@utils';
import { ResponseController } from '@dtos';

@Controller('comments')
export class CommentsController {
	constructor(private readonly commentsService: CommentsService) {}

	@Post('addcomments')
	addComments(
		@UserParam() user: UserParamsDto,
		@Body() input: AddCommentsJsonDto
	): Promise<ResponseController> {
		return this.commentsService.addComments(user, input);
	}

	@AllowUnauthorizedRequest()
	@Get('getcomment/:id')
	getComments(
		// @UserParam() user: UserParamsDto,
		@Param('id') id: string
	): Promise<ResponseController> {
		return this.commentsService.getComment(id);
	}

	@Get('mycomments')
	async myComments(
		@UserParam() user: UserParamsDto
	): Promise<ResponseController> {
		return await this.commentsService.myComments(user);
	}

	@Post('deletecomment')
	async deleteComment(
		@UserParam() user: UserParamsDto,
		@Body() input: DeleteCommentsJsonDto
	): Promise<ResponseController> {
		return await this.commentsService.deleteComment(user, input);
	}

	@Put('updatecomment')
	async updateComment(
		@UserParam() user: UserParamsDto,
		@Body() input: UpdateCommentsJsonDto
	): Promise<ResponseController> {
		return await this.commentsService.updateComment(user, input);
	}

	@Post('likecomment')
	async likeComment(
		@UserParam() user: UserParamsDto,
		@Body() input: LikeDislikeCommentJsonDto
	): Promise<ResponseController> {
		return await this.commentsService.likeComment(user, input);
	}

	@Post('dislikecomment')
	async dislikeComment(
		@UserParam() user: UserParamsDto,
		@Body() input: LikeDislikeCommentJsonDto
	): Promise<ResponseController> {
		return await this.commentsService.dislikeComment(user, input);
	}
}
