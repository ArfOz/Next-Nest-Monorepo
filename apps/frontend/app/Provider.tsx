'use client';

import { SessionProvider } from 'next-auth/react';
import { Session } from 'next-auth';

type Props = {
    children?: React.ReactNode;
    session: Session;
};

export const NextAuthProvider = ({ children }: Props) => {
    return <SessionProvider>{children}</SessionProvider>;
};
