// Function to generate success response
export const successResponse = (
  res,
  data,
  message = "Success",
  status = 200
) => {
  return res.status(status).json({ success: true, message, data });
};

// Function to generate error response
export const errorResponse = (res, message = "Error", status = 500) => {
  return res.status(status).json({ success: false, message });
};

export const responseMessage = {
  retrieved: "Record retrieved successfully",
  created: "Record created successfully",
  updated: "Record updated successfully",
  deleted: "Record deleted successfully",
  validPassword: "Pasword is valid.",
};

export const responseError = {
  notFound: "Record not found",
  internalError: "Internal server error occurred",
  unAuthorized: "You are unauthorized",
  wrongEmail: "Wrong Email",
  wrongMasterKey: "Wrong Master Key",
  wrongPassword: "Wrong Password",
  wrongCredentials: "Wrong Credentials",
  passwordPolicyError: "Password must be between 8 and 50 characters",
  userExists: "Another user with this email or username is already registered",
  expiredPasswordToken: "Reset password token expired",
  wrongPasswordToken: "Wrong reset password token",
};

export const responseStatus = {
  ok: 200,
  created: 201,
  updated: 202,
  deleted: 204,
  badRequest: 400,
  unAuthorized: 401,
  notFound: 404,
  conflict: 409,
  internalError: 500,
};
