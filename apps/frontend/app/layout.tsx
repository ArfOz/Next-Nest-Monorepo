// import 'tailwindcss/tailwind.css';
import Navbar from './components/Navbar';
import './tailwind.css';

export const metadata = {
    title: 'Welcome to frontend',
    description: 'Generated by create-nx-workspace'
};

export default function RootLayout({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>
                <Navbar />
                {children}
            </body>
        </html>
    );
}
