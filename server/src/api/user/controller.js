import User from "./model";
import { logger, responseError, responseMessage } from "./../../utils/";
import passport from "passport";
import {
  errorResponse,
  responseStatus,
  successResponse,
} from "../../utils/response";
import { sendEmail } from "../../services/nodemailer";
import { sign } from "../../services/jwt";
import jwt from "jsonwebtoken";

export const checkUserExists = async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    return errorResponse(
      res,
      responseError.userExists,
      responseStatus.conflict
    );
  }
  return next();
};

export const signup = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const newUser = new User({ firstName, lastName, email, password });
    const userData = await newUser.save();
    const responseObject = {
      id: userData.id,
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      createdAt: userData?.createdAt,
      updatedAt: userData?.updatedAt,
    };
    return successResponse(
      res,
      responseObject,
      responseMessage.created,
      responseStatus.created
    );
  } catch (err) {
    logger.error(err.message);
    return errorResponse(res, err);
  }
};

export const login = async (req, res) => {
  try {
    const token = sign(req.user.toJSON());
    const responseObject = {
      email: req.user.email,
      token,
    };
    return successResponse(res, responseObject);
  } catch (err) {
    logger.error(err.message);
    return errorResponse(res, err.message);
  }
};

export const forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const userData = await User.findOne({ email });
    if (!userData) {
      logger.error(responseError.notFound);
      return errorResponse(
        res,
        responseError.notFound,
        responseStatus.notFound
      );
    }
    // Generate a token that expires in 15 minutes
    const resetPasswordToken = sign({
      email,
      _id: userData._id,
      expiryTime: 15,
    });
    const emailBody = {
      email,
      userId: userData._id,
      resetPasswordToken,
    };
    //node mailer has test config for the task
    const emailSent = await sendEmail(emailBody);
    if (!emailSent) {
      return errorResponse(
        res,
        responseError.internalError,
        responseStatus.internalError
      );
    }
    // resetPasswordToken is only in response for test, it will be removed when nodemailer is configured
    userData.resetPasswordToken = resetPasswordToken;
    await userData.save();
    const responseObject = {
      resetPasswordToken,
      email: email,
    };
    return successResponse(res, responseObject);
  } catch (err) {
    logger.error(err.message);
    return errorResponse(res, err.message);
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { resetPasswordToken, password } = req.body;

    const decoded = jwt.decode(resetPasswordToken);
    const userId = decoded._id;
    if (decoded.exp && Date.now() >= decoded.exp * 1000) {
      logger.error(responseError.expiredPasswordToken);
      return errorResponse(
        res,
        responseError.expiredPasswordToken,
        responseStatus.badRequest
      );
    }
    const userData = await User.findById(userId);
    if (!userData) {
      logger.error(responseError.notFound);
      return errorResponse(res, responseError.message, responseStatus.notFound);
    }
    if (!userData.resetPasswordToken) {
      logger.error(responseError.expiredPasswordToken);
      return errorResponse(
        res,
        responseError.expiredPasswordToken,
        responseStatus.badRequest
      );
    }
    if (userData.resetPasswordToken !== resetPasswordToken) {
      logger.error(responseError.notFound);
      return errorResponse(
        res,
        responseError.wrongPasswordToken,
        responseStatus.badRequest
      );
    }
    userData.password = password;
    userData.resetPasswordToken = undefined;

    await userData.save();
    const responseObject = {
      id: userData.id,
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      createdAt: userData?.createdAt,
      updatedAt: userData?.updatedAt,
    };

    return successResponse(
      res,
      responseObject,
      responseMessage.updated,
      responseStatus.ok
    );
  } catch (err) {
    logger.error(err.message);
    return errorResponse(res, err.message);
  }
};
