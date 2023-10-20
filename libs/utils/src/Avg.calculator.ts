// import { CommentDetails } from 'apps/frontend/app/Dtos/CityDetails.dto';
export function AvgCalculator(comments: any): number {
    // Average of total comment stars
    const average =
        comments.reduce((total: number, next: any) => total + next.stars, 0) /
        comments.length;

    return parseFloat(average.toFixed(1));
}
