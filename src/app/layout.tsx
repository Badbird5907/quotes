import '@/styles/globals.css';

import {Metadata} from "next";
import {Providers} from "./providers";
import {Button} from "@nextui-org/button";
import {FaGithub} from "react-icons/fa";

export default function RootLayout({children}: { children: React.ReactNode }) {
    return (
        <html lang="en" className='dark'>
        <body>
        <Providers>
            <a href={"https://github.com/Badbird5907/quotes/"} target={"_blank"}>
                <Button isIconOnly variant={"faded"} className={"right-0 top-0 absolute mr-2 mt-2"}>
                    <FaGithub />
                </Button>
            </a>
            {children}
            <span className={"text-gray-400 bottom-0"}>Inspired by <a href={"https://quotes.basil.cafe/"} target={"_blank"} className={"hover:underline hover:decoration-dashed"}>quotes.basil.cafe</a></span>
        </Providers>
        </body>
        </html>
    );
}
export const metadata: Metadata = {
    title: 'Quotes',
    description: 'A collection of out of context quotes from my friends.',
};