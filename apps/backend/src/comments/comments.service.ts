import { Injectable } from '@nestjs/common';
import { CommentsDBService } from '@database';
import { AddCommentsJsonDto } from './dtos';

@Injectable()
export class CommentsService {
    constructor(private readonly restaurantDBService: CommentsDBService) {}

    async addRestaurant(data: AddCommentsJsonDto) {
        const response = await this.restaurantDBService.addComments(data);
        return response;
    }
}
