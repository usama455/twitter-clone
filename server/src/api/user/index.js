import { Router } from "express";
import {
  login,
  signup,
  getAllUsers,
  forgetPassword,
  checkUserExists,
  resetPassword,
  userProfile,
  updateFollowStatus
} from "./controller";
import {
  forgetPasswordValidations,
  passportValidation,
  resetPasswordValidations,
  signUpVlidations,
  userInfoValidation,
} from "./middleware";
import { dataValidator, tokenValidator } from "../../utils";

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

router.get('/', tokenValidator, getAllUsers);
router.get("/profile/:id", tokenValidator, userInfoValidation, userProfile)

router.post("/update-follow/:id", tokenValidator, userInfoValidation, updateFollowStatus)

export default router;
