export class ResponseJsonDto {
    accessToken?: string;
    refreshToken?: string;
    user?: {
        username: string;
        email: string;
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
    };
    token: {
        accessToken: string;
        refreshToken: string;
    };
}
