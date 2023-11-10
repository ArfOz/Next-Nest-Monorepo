import NextAuth from 'next-auth/next';

declare module 'next-auth' {
    interface Session {
        refreshTokenExpires?: number;
        accessTokenExpires?: number;
        refreshToken?: string;
        accessToken: string;
        error?: string;
        user?: User | undefined;
    }

    interface User {
        email: string;
        username: string;
    }
    interface Data {
        user: {
            username: string;
            email: string;
        };
        token: {
            refreshToken?: string;
            accessToken: string;
        };
    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        refreshTokenExpires?: number | undefined;
        accessTokenExpires?: number | undefined;
        refreshToken?: string;
        accessToken: string;
        exp?: number;
        iat?: number;
        jti?: string;
    }
}

export interface ResponseType {
    accessToken: string;
    refreshToken: string;
    user: {
        username: string;
        email: string;
    };
}
