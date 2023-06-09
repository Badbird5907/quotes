import {withMethods} from "@utils/server";
import {extractPersonInfo, resolveQuotes, resolveQuotesSafe} from "@utils/quote";

export default withMethods(async (req, res) => {
    const {id} = req.query;
    const quotes = await resolveQuotesSafe(id as string);
    if (!quotes) {
        res.status(404).json({
            success: false,
            error: "Person not found"
        });
        return;
    }
    res.status(200).json({
        success: true,
        ...extractPersonInfo(quotes),
        quotes: quotes.quotes,
        total: quotes.quotes.length,
    });
}, "GET");