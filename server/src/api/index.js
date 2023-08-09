import { Router } from "express";
import user from "./user";
import passport from "passport";
import { tokenValidator } from "../utils";

const router = new Router();

//Open Routes
router.use("/user", user);

//ProtectedRoutes
// router.use("/card", tokenValidator, card);

export default router;
