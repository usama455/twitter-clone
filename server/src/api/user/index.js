import { Router } from "express";
import {
  login,
  signup,
  forgetPassword,
  checkUserExists,
  resetPassword,
} from "./controller";
import {
  forgetPasswordValidations,
  passportValidation,
  resetPasswordValidations,
  signUpVlidations,
} from "./middleware";
import { dataValidator } from "../../utils";

const router = new Router();

router.post(
  "/register",
  signUpVlidations,
  dataValidator,
  checkUserExists,
  signup
);
router.post("/login", passportValidation, login);
router.post(
  "/forget-password",
  forgetPasswordValidations,
  dataValidator,
  forgetPassword
);
router.post(
  "/reset-password",
  resetPasswordValidations,
  dataValidator,
  resetPassword
);

export default router;
