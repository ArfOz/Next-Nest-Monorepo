import { Stack } from '@mui/material';
import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';
import { ResponseJsonDto } from './response.dto';
import { JWT } from 'next-auth/jwt';
import { Session, Data, User } from 'next-auth';

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
                console.log('authoriye ici', credentials);
                if (!credentials?.email || !credentials?.password) throw null;
                try {
                    const { email, password } = credentials;
                    const res = await fetch(
                        'http://localhost:3300/api/user/login',
                        {
                            method: 'POST',
                            body: JSON.stringify({
                                email,
                                password
                            }),
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        }
                    );
                    const response: ResponseJsonDto = await res.json();
                    console.log('responsefull', response);

                    if (res.status == 401) {
                        console.log('res error', response.Details);

                        throw new Error(JSON.stringify(response));
                    }

                    console.log('responseeeeeeeeeeeeeeeeee', response);
                    if (res.status == 201) {
                        return response;
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
            console.log('jwt entry', token, 'userrrrrrrrrrrrrrrr', user);
            // if (account?.accessToken) {
            //     token.accessToken = account.backendTokens.accessToken;
            // }

            // token.accessToken=user.
            if (user) {
                token.accessToken = user.accessToken;
                token.refreshToken = user.refreshToken;
                token.name = user.user.username;
                token.email = user.user.email;
                token.accessTokenExpires = user.expiresAccessToken;
                token.refreshTokenExpires = user.expiresRefreshToken;

                return token;
            }

            console.log('jwt cikis', token);
            return token;
        },

        //  The session receives the token from JWT
        async session({ session, token }: { session: Session; token: JWT }) {
            console.log('session giris', session, 'tokennnnnnnnnnnnnn', token);
            if (token && session.user) {
                // session.user.username = token.name;
                // session.user.email = token.email;
                session.accessTokenExpires = token.accessTokenExpires;
                session.accessToken = token.accessToken;
                session.refreshToken = token.refreshToken;
                session.user.name = token.name;
                session.refreshTokenExpires = token.refreshTokenExpires;
            }

            console.log('sessin cikis', session);

            return session;
        }
    }
});

export { handler as GET, handler as POST };
