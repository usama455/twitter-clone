import jwt from "jsonwebtoken";
import { jwtSecret, expiresIn } from "../../config";

export const sign = ({ email, _id, expiryTime = expiresIn }) => {
  const today = new Date();
  let expirationDate;
  expirationDate = new Date(
    today.getTime() + parseInt(expiryTime, 10) * 60 * 1000
  );
  return jwt.sign(
    {
      email,
      _id,
      exp: parseInt(expirationDate.getTime() / 1000, 10),
    },
    jwtSecret
  );
};
