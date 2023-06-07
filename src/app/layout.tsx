import '@/styles/globals.css';

import {Metadata} from "next";
import {Providers} from "./providers";

export default function RootLayout({children}: { children: React.ReactNode }) {
    return (
        <html lang="en" className='dark'>
        <body>
        <Providers>
            {children}
            <span className={"absolute right-0 bottom-0"}>Inspired by <a href={"https://quotes.basil.cafe/"} className={"hover:underline hover:decoration-dashed"}>quotes.basil.cafe</a></span>
        </Providers>
        </body>
        </html>
    );
}
export const metadata: Metadata = {
    title: 'Home',
    description: 'A collection of out of context quotes from my friends.',
};