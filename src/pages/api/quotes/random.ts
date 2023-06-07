import {withMethods} from "@utils/server";
import {extractPersonInfo, resolveQuotes} from "@utils/quote";
import {quotes as allQuotes} from "@/util/quotes";

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
        quote: quotes.quotes[randomIndex]
    });
}, "GET");