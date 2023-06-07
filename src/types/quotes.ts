import Person from "@app-types/person";

export type Quote = {
    quote: string;
    image?: string;
} | string;
export interface QuoteData extends Person {
    quotes: Quote[];
}