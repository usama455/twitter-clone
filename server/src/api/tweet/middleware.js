import { body, param, validationResult } from "express-validator";


export const createTweetValidator = [
    body("content").isLength({ min: 1, max: 255 })
];
