export class ResponseJsonDto {
    accessToken: string;
    refreshToken: string;
    user: {
        username: string;
        email: string;
    };
    status: number;
    statusText: string;
}
