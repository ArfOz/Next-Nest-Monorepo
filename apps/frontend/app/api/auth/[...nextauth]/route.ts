// // import NextAuth from 'next-auth';
// // import { authOptions } from './options';

// // const handler = NextAuth(authOptions);
// // export { handler as GET, handler as POST };

// import { NextAuthOptions } from 'next-auth';
// import NextAuth from 'next-auth/next';
// import CredentialsProvider from 'next-auth/providers/credentials';

// // async function refreshToken(token: JWT): Promise<JWT> {
// //     const res = await fetch(Backend_URL + '/auth/refresh', {
// //         method: 'POST',
// //         headers: {
// //             authorization: `Refresh ${token.backendTokens.refreshToken}`
// //         }
// //     });
// //     console.log('refreshed');

// //     const response = await res.json();

// //     return {
// //         ...token,
// //         backendTokens: response
// //     };
// // }

// export const authOptions: NextAuthOptions = {
//     pages: {
//         // error: '/login',
//         signIn: '/login'
//     },
//     session: { strategy: 'jwt' },
//     // providers: [
//     //     CredentialsProvider({
//     //         name: 'Sign In',
//     //         credentials: {
//     //             email: {
//     //                 label: 'Email',
//     //                 type: 'text',
//     //                 placeholder: 'example@example.com'
//     //             },
//     //             password: { label: 'Password', type: 'password' }
//     //         },
//     //         async authorize(credentials, req) {
//     //             if (!credentials?.email || !credentials?.password) return null;
//     //             const { email, password } = credentials;
//     //             const res = await fetch(
//     //                 'http://localhost:3300/api/user/login',
//     //                 {
//     //                     method: 'POST',
//     //                     body: JSON.stringify({
//     //                         email,
//     //                         password
//     //                     }),
//     //                     headers: {
//     //                         'Content-Type': 'application/json'
//     //                     }
//     //                 }
//     //             );

//     //             if (res.status == 401) {
//     //                 console.log(res.statusText);

//     //                 return false;
//     //             }
//     //             const user = await res.json();
//     //             console.log('responseeeeeeeeeeeeeeeeee', user);
//     //             return user;
//     //         }
//     //     })
//     // ],
//     providers: [
//         CredentialsProvider({
//             // The name to display on the sign in form (e.g. "Sign in with...")
//             name: 'Credentials',
//             // `credentials` is used to generate a form on the sign in page.
//             // You can specify which fields should be submitted, by adding keys to the `credentials` object.
//             // e.g. domain, username, password, 2FA token, etc.
//             // You can pass any HTML attribute to the <input> tag through the object.
//             credentials: {
//                 username: {
//                     label: 'Email',
//                     type: 'text',
//                     placeholder: 'jsmith'
//                 },
//                 password: { label: 'Password', type: 'password' }
//             },
//             async authorize(credentials, req) {
//                 // Add logic here to look up the user from the credentials supplied
//                 const user = {
//                     id: '1',
//                     name: 'J Smith',
//                     email: 'jsmith@example.com'
//                 };

//                 if (user) {
//                     // Any object returned will be saved in `user` property of the JWT
//                     return user;
//                 } else {
//                     // If you return null then an error will be displayed advising the user to check their details.
//                     return null;

//                     // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
//                 }
//             }
//         })
//     ]
//     // callbacks: {
//     //     async signIn({ user, account, profile, email, credentials }) {
//     //         return true;
//     //     },
//     //     async jwt({ token }) {
//     //         token.userRole = 'regusr';
//     //         return token;
//     //     }
//     // }
// };

// const handler = NextAuth(authOptions);

// export { handler as GET, handler as POST };

import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';
import { ResponseJsonDto } from './response.dto';

const handler = NextAuth({
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
                if (!credentials?.email || !credentials?.password) return null;
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

                    if (res.status == 401) {
                        console.log(res.statusText);

                        return false;
                    }
                    const response: ResponseJsonDto = await res.json();
                    console.log('responseeeeeeeeeeeeeeeeee', response);
                    return {
                        ...response.user,
                        backendTokens: {
                            accessToken: response.accessToken,
                            refreshToken: response.refreshToken
                        }
                    };
                } catch (e) {
                    console.error(e);
                    return null;
                }
            }
        })
    ],
    pages: {
        signIn: '/login'
    },
    callbacks: {
        jwt: async ({ token, user }) => {
            // user is only available the first time a user signs in authorized
            console.log('jwt entry', token, user);
            if (user) {
                return {
                    ...token,
                    backendTokens: {
                        accessToken: user.backendTokens.accessToken,
                        refreshToken: user.backendTokens.refreshToken
                    }
                };
            }

            console.log('jwt cikis', token);
            return token;
        },

        //  The session receives the token from JWT
        session: async ({ session, token }) => {
            console.log('session giris', session, 'token baslar', token);
            session.backendTokens = {
                accessToken: token.backendTokens.accessToken,
                refreshToken: token.backendTokens.refreshToken
            };
            // session.expires =
            // session.user = token.user;
            console.log('seesion cikis', session);
            return session;
        }
    }
});

export { handler as GET, handler as POST };
