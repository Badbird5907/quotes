import Person from "@app-types/person";

// ugly, I know...
// I didn't have a idea of how to structure this project so I just winged it
export type Quote = {
    quote: string | string[] | Quote[];
    image?: string;
    number?: number;
    display?: "left" | "right" | undefined;
};
export interface QuoteData extends Person {
    quotes: Quote[];
}
export type InitialData = {
    data: QuoteData;
    total: number;
}
export interface QuoteDataUnsafe extends Person {
    quotes: any[];
}
