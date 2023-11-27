import { CitiesJsonDto } from './Cities.dto';

export class CommentDetails {
    'id': string;
    'restaurant_id': string;
    'name': string;
    'comment': string;
    'stars': number;
    'date': string;
    'user_id': string;
}

export class CityDetailsJsonDto {
    restaurant: CitiesJsonDto;
    comments: Array<CommentDetails>;
}
