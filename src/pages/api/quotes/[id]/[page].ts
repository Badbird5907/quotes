import {withMethods} from "@utils/server";
import {ensureQuoteIsObject, extractPersonInfo, resolveQuotes} from "@utils/quote";
import {debug} from "@/util/log";

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
    const page = parseInt(req.query.page as string);
    if (isNaN(page)) {
        res.status(400).json({
            success: false,
            error: "Invalid page number"
        });
        return;
    }
    if (page < 1 || page > quotes.quotes.length) {
        res.status(404).json({
            success: false,
            error: "Page not found"
        });
        return;
    }
    const total = quotes.quotes.length;
    res.status(200).json({
        success: true,
        ...extractPersonInfo(quotes),
        quote: ensureQuoteIsObject(quotes.quotes[page - 1]),
        total,
    });
}, "GET");
