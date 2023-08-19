// order route for buyer to make order

import express, { Request, Response } from "express";
import { getAllOrders, getOrder, placeOrder } from "../controller/order";
import verifyUserToken from "../middleware/authenticate";
import checkUserType from "../middleware/checkUser";

const orderRouter = express.Router();

// place order route for buyer
orderRouter.post("/place", verifyUserToken, checkUserType("buyer"), placeOrder);

// get all orders for a buyer
orderRouter.get("/", verifyUserToken, checkUserType("buyer"), getAllOrders);

// get a single order detail for a buyer
orderRouter.get("/:id", verifyUserToken, checkUserType("buyer"), getOrder);

// export the orderRouter
export default orderRouter;
