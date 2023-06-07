import {quotes} from "@/util/quotes";
import {QuoteData} from "@/types/quotes";
import Person from "@/types/person";

export async function resolveQuotes(name: string): Promise<QuoteData | null> {
    // get from quotes/<name>.json
    /*
    const jsonDirectory = path.join(process.cwd(), 'quotes');
    const fileContents = await fs.readFile(jsonDirectory + '/' + name.toLowerCase() + '.json', 'utf8');
    return JSON.parse(fileContents) as FileData;
     */
    const quote = quotes.find(quote => quote.name === name.toLowerCase());
    if (quote) {
        return quote.data as QuoteData;
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
export async function getInitialData(): Promise<QuoteData[]> {
    // get the first quote
    const quoteData: QuoteData[] = [];
    for (const quote of quotes) {
        const data = quote.data as QuoteData;
        // only include the first quote to reduce the size of the initial data
        data.quotes = [data.quotes[0]];
        quoteData.push(data);
    }
    return quoteData;

}