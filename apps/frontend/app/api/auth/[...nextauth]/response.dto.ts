export class ResponseJsonDto {
    Data: {
        accessToken?: string;
        refreshToken?: string;
        user: {
            username: string;
            email: string;
            id: string;
        };
    };

    status?: number;
    statusText?: string;

    Error?: string;
    Details?: string;
    Code?: number;
}

export class JWTData {
    user: {
        username: string;
        email: string;
        id: string;
    };
    token: {
        accessToken: string;
        refreshToken: string;
    };
}
