import NextAuth from 'next-auth';

declare module 'next-auth' {
    interface Session {
        refreshTokenExpires?: number;
        accessTokenExpires?: string;
        refreshToken?: string;
        accessToken: string;
        error?: string;
        user?: User;
    }
    interface User {
        email: string;
        username: string;
    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        refreshTokenExpires?: number;
        accessTokenExpires?: number;
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
