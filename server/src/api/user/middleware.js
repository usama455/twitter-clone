// import User from "./model";
import { body, param, validationResult } from "express-validator";
import {
  errorResponse,
  responseError,
  responseStatus,
} from "../../utils/response";
import passport from "passport";

export const passportValidation = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (!user) {
      return errorResponse(res, info.message, info.status); // wrong creds
    }

    req.login(user, (err) => {
      if (err) {
        return next(err);
      }
      next();
    });
    next();
  })(req, res, next);
};

export const signUpVlidations = [
  body("firstName").isLength({ min: 3, max: 255 }),
  body("lastName").isLength({ min: 3, max: 255 }),
  body("email").isEmail(),
  body("email").isLength({ max: 255 }),
  body("password").isLength({ min: 5, max: 30 }),
];

export const forgetPasswordValidations = [body("email").isEmail()];
export const resetPasswordValidations = [
  body("resetPasswordToken"),
  body("password").isLength({ min: 8, max: 50 }),
];

export const userInfoValidation = [
  param("id").isMongoId().withMessage("Invalid user ID format"),
];