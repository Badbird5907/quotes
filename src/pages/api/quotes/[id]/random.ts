import {withMethods} from "@utils/server";
import {ensureQuoteIsObject, extractPersonInfo, resolveQuotes} from "@utils/quote";

export default withMethods(async (req, res) => {
    const {id} = req.query;
    const quotes = await resolveQuotes(id as string);
    if (!quotes) {
        res.status(404).json({
            success: false,
            error: "Person not found"
        });
        return;
    }
    const total = quotes.quotes.length;
    const randomIndex = Math.floor(Math.random() * quotes.quotes.length);
    res.status(200).json({
        success: true,
        ...extractPersonInfo(quotes),
        quote: ensureQuoteIsObject(quotes.quotes[randomIndex], total),
        total
    });
}, "GET");