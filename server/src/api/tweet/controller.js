import Tweet from "./model";
import User from "../user/model";
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

export const updateLikeTweet = async (req, res) => {
    try {
        const tweetId = req.params.id;
        const userId = req.user._id;

        const tweet = await Tweet.findById(tweetId);

        if (!tweet) {
            return errorResponse(res, "Tweet not found", responseStatus.notFound);
        }

        const isLiked = tweet.likes.includes(userId);

        if (isLiked) {
            // Already liked, so unlike the tweet
            tweet.likes.pull(userId);
            await tweet.save();
            return successResponse(res, "Tweet unliked successfully");
        } else {
            // Not liked, so like the tweet
            tweet.likes.push(userId);
            await tweet.save();
            return successResponse(res, "Tweet liked successfully");
        }
    } catch (err) {
        logger.error(err.message);
        return errorResponse(res, err);
    }
};

export const updateRetweet = async (req, res) => {
    try {
        const tweetId = req.params.id;
        const userId = req.user._id;

        const tweet = await Tweet.findById(tweetId);

        if (!tweet) {
            return errorResponse(res, "Tweet not found", responseStatus.notFound);
        }

        const isRetweeted = tweet.retweets.includes(userId);

        if (isRetweeted) {
            // Already retweeted, so undo the retweet
            tweet.retweets.pull(userId);
            await tweet.save();
            return successResponse(res, "Retweet undone successfully");
        } else {
            // Not retweeted, so retweet the tweet
            tweet.retweets.push(userId);
            await tweet.save();
            return successResponse(res, "Tweet retweeted successfully");
        }
    } catch (err) {
        logger.error(err.message);
        return errorResponse(res, err);
    }
};

export const userTweetsAndRetweets = async (req, res) => {
    try {
        const userId = req.params.id;
        const page = req.query.page || 1; // Get the requested page number from query parameter
        const limit = 10; // Number of items per page

        // Calculate the skip value to paginate the results
        const skip = (page - 1) * limit;

        // Fetch tweets and retweets by the user, sorted by timestamp, with pagination
        const userTweetsAndRetweets = await Tweet.find({
            $or: [{ author: userId }, { retweets: userId }],
        })
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .populate("author");

        // Count the total number of tweets and retweets by the user
        const totalTweetsAndRetweets = await Tweet.countDocuments({
            $or: [{ author: userId }, { retweets: userId }],
        });

        const totalPages = Math.ceil(totalTweetsAndRetweets / limit);

        const responseObject = {
            tweets: userTweetsAndRetweets,
            totalPages: totalPages,
            currentPage: page,
        };

        return successResponse(res, responseObject, "User's tweets and retweets retrieved successfully");
    } catch (err) {
        logger.error(err.message);
        return errorResponse(res, err);
    }
};


export const getFeedTweetsAndRetweets = async (req, res) => {
    try {
        const currentUserId = req.user._id; // Get the current user's ID
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10; // Set the limit of tweets per page

        // Find the current user's followers
        const currentUser = await User.findById(currentUserId).select("followers");

        // Include the current user's ID in the followers list
        const followerIds = [currentUserId, ...currentUser.followers];

        // Calculate the skip value based on the current page and limit
        const skip = (page - 1) * limit;

        // Fetch tweets and retweets by the current user and their followers, sorted by timestamp
        const feedTweetsAndRetweets = await Tweet.find({
            $or: [
                { author: { $in: followerIds } },      // Tweets by the current user and followers
                { retweets: { $in: followerIds } }     // Retweets by the current user and followers
            ],
        })
            .sort({ createdAt: -1 }) // Sort in descending order (newest first)
            .populate("author")
            .skip(skip) // Skip records based on the current page and limit
            .limit(limit); // Limit the number of records per page

        const totalTweets = await Tweet.countDocuments({
            $or: [
                { author: { $in: followerIds } },
                { retweets: { $in: followerIds } }
            ]
        });

        const totalPages = Math.ceil(totalTweets / limit);

        const responseObject = {
            tweets: feedTweetsAndRetweets,
            currentPage: page,
            totalPages: totalPages
        };

        return successResponse(res, responseObject, "Feed tweets and retweets retrieved successfully");
    } catch (err) {
        logger.error(err.message);
        return errorResponse(res, err);
    }
};



export const deleteTweet = async (req, res) => {
    try {
        const currentUserId = req.user._id; // Get the current user's ID
        const tweetId = req.params.id;      // Get the tweet ID from the request parameter

        // Find the tweet by ID and its author
        const tweet = await Tweet.findOne({ _id: tweetId, author: currentUserId });

        if (!tweet) {
            return errorResponse(res, "Tweet not found or unauthorized to delete", responseStatus.notFound);
        }

        // Delete the tweet
        await Tweet.deleteOne({ _id: tweetId, author: currentUserId });

        return successResponse(res, "Tweet deleted successfully");
    } catch (err) {
        logger.error(err.message);
        return errorResponse(res, err);
    }
};
