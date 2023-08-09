import { Router } from "express";
import user from "./user";
import tweet from "./tweet"

import passport from "passport";
import { tokenValidator } from "../utils";

const router = new Router();

//Open Routes
router.use("/user", user);

//ProtectedRoutes
router.use("/tweet", tokenValidator, tweet);

export default router;
