import {withMethods} from "@utils/server";
import {resolveQuotes} from "@utils/quote";
import {debug} from "@/util/log";

export default withMethods(async (req, res) => {
    const {id} = req.query;
    debug("id", id)
    const quotes = await resolveQuotes(id as string);
    res.status(200).json({
        success: true,
        data: quotes
    });
}, "GET");