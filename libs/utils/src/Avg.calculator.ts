// import { CommentDetails } from 'apps/frontend/app/Dtos/CityDetails.dto';
export function AvgCalculator(comments: any): number {
    console.log('dataaa', comments);

    // Average of total comment stars
    const average =
        comments.reduce((total: number, next: any) => total + next.stars, 0) /
        comments.length;

    console.log(average.toFixed(1));

    return parseFloat(average.toFixed(1));
}
