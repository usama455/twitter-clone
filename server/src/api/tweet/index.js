import { Router } from "express";
import {
    createTweet,
} from "./controller";
import {
    createTweetValidator,
} from "./middleware";
// import { dataValidator, tokenValidator } from "../../utils";

const router = new Router();
router.post("/create", createTweetValidator, createTweet)

export default router;
