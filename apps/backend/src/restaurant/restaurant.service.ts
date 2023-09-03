import { RestaurantDBService } from '@database';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RestaurantService {
  constructor(private readonly restaurantDBService: RestaurantDBService) {}

  getData(): { message: string } {
    return { message: 'Hello API' };
  }

  async getAll() {
    const data = await this.restaurantDBService.getAll();
    return data;
  }
}
