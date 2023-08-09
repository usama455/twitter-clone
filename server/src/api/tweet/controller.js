import Tweet from "./model";
import { logger, responseError, responseMessage } from "./../../utils/";
import {
    errorResponse,
    responseStatus,
    successResponse,
} from "../../utils/response";

export const createTweet = async (req, res) => {
    try {
        const { content } = req.body;
        const author = req.user._id;

        const newTweet = new Tweet({
            content,
            author,
        });

        await newTweet.save();

        return successResponse(res, "Tweet created successfully");

    } catch (err) {
        logger.error(err.message);
        return errorResponse(res, err);
    }
}