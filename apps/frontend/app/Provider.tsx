'use client';

import { SessionProvider } from 'next-auth/react';
import { Session } from 'next-auth';
import { session } from 'passport';

type Props = {
    children?: React.ReactNode;
    session?: Session | null;
};

export const NextAuthProvider = ({ children, session }: Props) => {
    return <SessionProvider session={session}>{children}</SessionProvider>;
};
