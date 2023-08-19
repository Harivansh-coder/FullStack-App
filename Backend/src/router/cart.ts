// contains all the cart management routes

import express from "express";
import verifyUserToken from "../middleware/authenticate";
import checkUserType from "../middleware/checkUser";
import validateRequestBody from "../middleware/validate";
import {
  addItemToCart,
  removeItemFromCart,
  updateItemQuantity,
  viewCart,
} from "../controller/cart";
import { validateCart } from "../utility/validate";

// import all cart router

const cartRouter = express.Router();

// cart route

cartRouter.get("/view", verifyUserToken, checkUserType("buyer"), viewCart);

cartRouter.post(
  "/add",
  verifyUserToken,
  checkUserType("buyer"),
  validateRequestBody(validateCart),
  addItemToCart
);

cartRouter.put(
  "/:id",
  verifyUserToken,
  checkUserType("buyer"),
  validateRequestBody(validateCart),
  updateItemQuantity
);

cartRouter.delete(
  "/remove/:product",
  verifyUserToken,
  checkUserType("buyer"),
  removeItemFromCart
);

// export the cartRouter
export default cartRouter;
