// import { CommentDetails } from 'apps/frontend/app/Dtos/CityDetails.dto';
export function AvgCalculator(restaurant: any): number {
    // Average of total comment stars
    let average;
    if (restaurant.stars || restaurant.comments) {
        const average = restaurant.stars / restaurant.comments;
        return parseFloat(average.toFixed(1));
    }

    return 0;
}
