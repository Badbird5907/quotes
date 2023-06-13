import {people} from "@/util/people";
import {InitialData, Quote, QuoteData, QuoteDataUnsafe} from "@/types/quotes";
import Person from "@/types/person";

export function ensureQuoteIsObject(quote: any): Quote {
    if (typeof quote === "string") quote = {
        quote: quote,
    } as Quote;
    return quote as Quote;
}
export async function resolveQuotesSafe(name: string): Promise<QuoteData | null> {
    const quote = people.find(quote => {
        return quote.name === name.toLowerCase() || quote.data?.name?.toLowerCase() === name.toLowerCase()
    });
    if (quote) {
        // return quote.data as QuoteData;
        const quoteData: any = quote.data;
        quoteData.quotes = quoteData.quotes.map((quote: any) => {
            return ensureQuoteIsObject(quote);
        }) as Quote[];
        return quoteData as QuoteData;
    } else {
        return null;
    }
}
export async function resolveQuotes(name: string): Promise<QuoteDataUnsafe | null> {
    const quote = people.find(quote => {
        return quote.name === name.toLowerCase() || quote.data?.name?.toLowerCase() === name.toLowerCase()
    });
    if (quote) {
        // return quote.data as QuoteData;
        const quoteData: any = quote.data;
        return quoteData as QuoteDataUnsafe;
    } else {
        return null;
    }
}

export function extractPersonInfo(data: QuoteData): Person {
    return {
        name: data.name,
        description: data.description,
        image: data.image
    }
}

export async function getInitialData(): Promise<InitialData[]> {
    // get the first quote
    const quoteData: InitialData[] = [];
    for (const quote of people) {
        const data: any = {...quote.data};
        const total = data.quotes.length;
        // only include the first quote to reduce the size of the initial data
        data.quotes = [ensureQuoteIsObject(data.quotes[0])];
        quoteData.push({
            data: data as QuoteData,
            total
        });
    }
    return quoteData;
}
