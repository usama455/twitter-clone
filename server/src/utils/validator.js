import { validationResult } from "express-validator";
import passport from "passport";
const { errorResponse, responseStatus, responseError } = require("./response");

export const tokenValidator = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return errorResponse(res, info.message, responseStatus.unAuthorized);
    }
    req.user = user;
    next();
  })(req, res, next);
};

export const dataValidator = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorArray = errors.array();
    for (let i = 0; i < errorArray.length; i++) {
      const error = errorArray[i];
      if (error.path === "password" && error.msg === "Invalid value") {
        errorArray[i].msg = responseError.passwordPolicyError;
      }
    }
    return errorResponse(res, errorArray, responseStatus.badRequest);
  }
  next();
};
