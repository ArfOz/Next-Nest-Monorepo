import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';
import { ResponseJsonDto } from './response.dto';
import { JWT } from 'next-auth/jwt';
import { Session, Data, User } from 'next-auth';
import { RequestNextNest } from '@frontendlibs';

const handler = NextAuth({
    secret: process.env.NEXT_AUTH_SECRET,
    session: { strategy: 'jwt' },
    providers: [
        CredentialsProvider({
            name: 'Credentials',

            credentials: {
                email: {
                    label: 'Username',
                    type: 'text',
                    placeholder: 'jsmith'
                },
                password: { label: 'Password', type: 'password' }
            },

            async authorize(credentials): Promise<any> {
                if (!credentials?.email || !credentials?.password) throw null;
                try {
                    const { email, password } = credentials;

                    const res = await RequestNextNest(
                        'user/login',
                        'POST',
                        undefined,
                        { email, password }
                    );

                    if (res.Error) {
                        throw new Error(JSON.stringify(res));
                    }

                    if (res.Success) {
                        return res.Data;
                    }
                } catch (e) {
                    console.error('next auth credentials', e);
                    throw new Error(
                        JSON.stringify({
                            errors: e,
                            status: false
                        })
                    );
                }
            }
        })
    ],
    pages: {
        signIn: '/login'
    },
    callbacks: {
        async jwt({ token, user }: { token: JWT; user?: any }) {
            // user is only available the first time a user signs in authorized
            if (user) {
                token.accessToken = user.accessToken;
                token.refreshToken = user.refreshToken;
                token.name = user.user.username;
                token.user_id = user.user.id;
                token.email = user.user.email;
                token.accessTokenExpires = user.expiresAccessToken;
                token.refreshTokenExpires = user.expiresRefreshToken;

                return token;
            }

            return { ...token };
        },

        //  The session receives the token from JWT
        async session({ session, token }: { session: Session; token: JWT }) {
            if (token && session?.user) {
                // session.user.username = token.name;
                // session.user.email = token.email;
                session.accessTokenExpires = token?.accessTokenExpires;
                session.accessToken = token.accessToken;
                session.refreshToken = token.refreshToken;
                session.user.name = token.name;
                session.refreshTokenExpires = token.refreshTokenExpires;
                session.user.id = token.user_id;
            }

            return { ...session };
        }
    }
});

export { handler as GET, handler as POST };
