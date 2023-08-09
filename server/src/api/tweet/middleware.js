import { body, param, validationResult } from "express-validator";


export const createTweetValidator = [
    body("content").isLength({ min: 1, max: 255 })
];
export const updateTweetValidator = [
    param("id").isMongoId().withMessage("Invalid ID format"),
];
