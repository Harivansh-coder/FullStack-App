// order route for buyer to make order

import express, { Request, Response } from "express";
import { getAllOrders, getOrder, placeOrder } from "../controller/order";
import verifyUserToken from "../middleware/authenticate";
import checkUserType from "../middleware/checkUser";

const orderRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Order management
 */

/**
 * @swagger
 * /orders/place:
 *   post:
 *     summary: Place an order
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Order placed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 order:
 *                   $ref: '#/components/schemas/Order'
 *       '400':
 *         description: Cart not found or cart is empty
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Cart not found or cart is empty
 *       '500':
 *         description: An error occurred
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: An error occurred
 */

/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Get all orders for the authenticated user
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: List of orders
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 orders:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Order'
 *       '500':
 *         description: An error occurred
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: An error occurred
 */

/**
 * @swagger
 * /orders/{id}:
 *   get:
 *     summary: Get details of a specific order
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: Order ID
 *     responses:
 *       '200':
 *         description: Order details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 order:
 *                   $ref: '#/components/schemas/Order'
 *       '400':
 *         description: Invalid order ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Invalid order ID
 *       '404':
 *         description: Order not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Order not found
 *       '500':
 *         description: An error occurred
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: An error occurred
 */

// place order route for buyer
orderRouter.post("/place", verifyUserToken, checkUserType("buyer"), placeOrder);

// get all orders for a buyer
orderRouter.get("/", verifyUserToken, checkUserType("buyer"), getAllOrders);

// get a single order detail for a buyer
orderRouter.get("/:id", verifyUserToken, checkUserType("buyer"), getOrder);

// export the orderRouter
export default orderRouter;
