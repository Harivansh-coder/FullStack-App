// auth and register route

import express from "express";
import { registerUser, loginUser } from "../controller/user";
import { validateLogin, validateRegister } from "../utility/validate";
import validateUsersRequest from "../middleware/validate";
// Create a userRouter
const userRouter = express.Router();

// register user route
userRouter.post(
  "/register",
  validateUsersRequest(validateRegister),
  registerUser
);

// login user route
userRouter.post("/login", validateUsersRequest(validateLogin), loginUser);

// export the userRouter
export default userRouter;
