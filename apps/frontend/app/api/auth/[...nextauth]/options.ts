// import type { NextAuthOptions } from 'next-auth';
// import CredentialsProvider from 'next-auth/providers/credentials';
// import { ResponseType } from './next-auth';
// import Providers from 'next-auth/providers';

// export const authOptions: NextAuthOptions = {
//     pages: {
//         signIn: '/login'
//     },
//     session: {
//         strategy: 'jwt'
//     },
//     providers: [
//         // CredentialsProvider({
//         //     name: 'Sign in',
//         //     credentials: {
//         //         email: {
//         //             label: 'Email',
//         //             type: 'email',
//         //             placeholder: 'example@example.com'
//         //         },
//         //         password: { label: 'Password', type: 'password' }
//         //     },
//         //     async authorize(credentials) {
//         //         if (!credentials?.email || !credentials.password) {
//         //             return null;
//         //         }

//         //         const { email, password } = credentials;
//         //         console.log('email.pass', email, password);

//         //         const res: any = await fetch(
//         //             'http://localhost:3300/api/user/login',
//         //             {
//         //                 method: 'POST',
//         //                 body: JSON.stringify({
//         //                     email,
//         //                     password
//         //                 }),
//         //                 headers: {
//         //                     'Content-Type': 'application/json'
//         //                 }
//         //             }
//         //         );

//         //         console.log('res', res);

//         //         return { ...res.user, apiToken: 'denemeulan' };
//         //     }
//         // })
//         CredentialsProvider({
//             // The name to display on the sign in form (e.g. 'Sign in with...')
//             name: 'Credentials',
//             // The credentials is used to generate a suitable form on the sign in page.
//             // You can specify whatever fields you are expecting to be submitted.
//             // e.g. domain, username, password, 2FA token, etc.
//             credentials: {
//                 username: {
//                     label: 'Username',
//                     type: 'text',
//                     placeholder: 'jsmith'
//                 },
//                 password: { label: 'Password', type: 'password' }
//             },
//             async authorize() {
//                 // Add logic here to look up the user from the credentials supplied
//                 const user = {
//                     id: 1,
//                     name: 'J Smith',
//                     email: 'jsmith@example.com'
//                 };

//                 return user;
//             }
//         })
//     ],
//     // callbacks: {
//     //     session: ({ session, token }) => {
//     //         return {
//     //             ...session,
//     //             user: {
//     //                 ...session.user,
//     //                 id: token.id,
//     //                 randomKey: token.randomKey
//     //             }
//     //         };
//     //     },
//     //     jwt: ({ token, user }) => {
//     //         if (user) {
//     //             const u = user as unknown as any;
//     //             return {
//     //                 ...token,
//     //                 id: u.id,
//     //                 randomKey: u.randomKey
//     //             };
//     //         }
//     //         return token;
//     //     }
//     // }

//     callbacks: {
//         async signIn({ user, account, profile, email, credentials }) {
//             return true;
//         },
//         async jwt({ token }) {
//             token.userRole = 'regusr';
//             return token;
//         }
//     }
// };
