import { Injectable } from '@nestjs/common';

@Injectable()
export class RestaurantService {
  getData(): { message: string } {
    return { message: 'Hello API' };
  }
}
