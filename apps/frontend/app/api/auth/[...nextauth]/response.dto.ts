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

export class JWTData {
    user: {
        username: string;
        email: string;
    };
    token: {
        accessToken: string;
        refreshToken: string;
    };
}
