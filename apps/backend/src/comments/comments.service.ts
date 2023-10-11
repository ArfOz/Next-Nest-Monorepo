import { Injectable } from '@nestjs/common';
import { CommentsDBService } from '@database';
import { AddCommentsJsonDto } from './dtos';

@Injectable()
export class CommentsService {
    constructor(private readonly restaurantDBService: CommentsDBService) {}

    async addComments(data: AddCommentsJsonDto) {
        console.log('geldi');
        const response = await this.restaurantDBService.addComments(data);
        return response;
    }
}
