import { NextAuthOptions } from 'next-auth';
import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';

// async function refreshToken(token: JWT): Promise<JWT> {
//     const res = await fetch(Backend_URL + '/auth/refresh', {
//         method: 'POST',
//         headers: {
//             authorization: `Refresh ${token.backendTokens.refreshToken}`
//         }
//     });
//     console.log('refreshed');

//     const response = await res.json();

//     return {
//         ...token,
//         backendTokens: response
//     };
// }

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: {
                    label: 'email',
                    type: 'text',
                    placeholder: 'jsmith'
                },
                password: { label: 'Password', type: 'password' }
            },
            async authorize(credentials, req) {
                if (!credentials?.email || !credentials?.password) return null;
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
                console.log(res);
                if (res.status == 401) {
                    console.log(res.statusText);

                    return null;
                }
                const user = await res.json();
                return user;
            }
        })
    ],

    callbacks: {
        async jwt({ token, user }) {
            return { ...token, ...user };

            // if (new Date().getTime() < token.backendTokens.expiresIn)
            //     return token;

            // return await refreshToken(token);
        },

        async session({ token, session }) {
            // session.user = token.user;
            // session.backendTokens = token.backendTokens;

            return session;
        }
    },
    pages: {
        error: '/login',
        signIn: '/login'
    }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
