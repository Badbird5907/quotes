import Person from "@app-types/person";

export type Quote = {
    quote: string | string[];
    image?: string;
} | string;
export interface QuoteData extends Person {
    quotes: Quote[];
}