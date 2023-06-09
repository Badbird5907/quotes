import Person from "@app-types/person";

// ugly, I know...
// I didn't have a idea of how to structure this project so I just winged it
export type Quote = {
    quote: string | string[];
    image?: string;
    number?: number;
    total: number;
};
export interface QuoteData extends Person {
    quotes: Quote[];
}
export interface QuoteDataUnsafe extends Person {
    quotes: any[];
}