import {withMethods} from "@utils/server";
import {extractPersonInfo, resolveQuotes} from "@utils/quote";

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
    res.status(200).json({
        success: true,
        ...extractPersonInfo(quotes),
        quotes: quotes.quotes
    });
}, "GET");