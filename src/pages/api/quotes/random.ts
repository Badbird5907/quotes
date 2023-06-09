import {withMethods} from "@utils/server";
import {ensureQuoteIsObject, extractPersonInfo, resolveQuotes} from "@utils/quote";
import {people as allQuotes} from "@/util/people";

export default withMethods(async (req, res) => {
    const randomQuote = allQuotes[Math.floor(Math.random() * allQuotes.length)];
    const quotes = await resolveQuotes(randomQuote.name as string);
    if (!quotes) {
        res.status(404).json({
            success: false,
            error: "Person not found"
        });
        return;
    }
    const randomIndex = Math.floor(Math.random() * quotes.quotes.length);
    res.status(200).json({
        success: true,
        ...extractPersonInfo(quotes),
        quote: ensureQuoteIsObject(quotes.quotes[randomIndex])
    });
}, "GET");