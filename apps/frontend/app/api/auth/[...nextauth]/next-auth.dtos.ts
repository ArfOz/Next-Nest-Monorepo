import NextAuth from 'next-auth';

declare module 'next-auth' {
    interface Session {
        email: string;
        username: string;
        backendTokens: {
            accessToken: string;
            refreshToken: string;
            expiresIn?: number;
        };
    }
    interface User {
        email: string;
        username: string;
        backendTokens: {
            accessToken: string;
            refreshToken: string;
            expiresIn?: number;
        };
    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        email: string;
        username: string;
        backendTokens: {
            accessToken: string;
            refreshToken: string;
            expiresIn?: number;
        };
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
