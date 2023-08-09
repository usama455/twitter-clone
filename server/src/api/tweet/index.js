import { Router } from "express";
import {
    createTweet,
    updateLikeTweet,
    updateRetweet,
    userTweetsAndRetweets,
    getFeedTweetsAndRetweets,
    deleteTweet
} from "./controller";
import {
    createTweetValidator,
    updateTweetValidator
} from "./middleware";

const router = new Router();
router.post("/create", createTweetValidator, createTweet)
router.patch("/update-like/:id", updateTweetValidator, updateLikeTweet)
router.patch("/update-retweet/:id", updateTweetValidator, updateRetweet)
router.get("/user/:id", updateTweetValidator, userTweetsAndRetweets)
router.get("/feed", getFeedTweetsAndRetweets)
router.delete("/:id", updateTweetValidator, deleteTweet)


export default router;
