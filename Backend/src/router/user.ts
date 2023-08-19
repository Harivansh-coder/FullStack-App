// auth and register route

import express from "express";
import { registerUser, loginUser } from "../controller/user";
import { validateLogin, validateRegister } from "../utility/validate";
import validateRequestBody from "../middleware/validate";
// Create a userRouter
const userRouter = express.Router();

// register user route
userRouter.post(
  "/register",
  validateRequestBody(validateRegister),
  registerUser
);

// login user route
userRouter.post("/login", validateRequestBody(validateLogin), loginUser);

// export the userRouter
export default userRouter;
