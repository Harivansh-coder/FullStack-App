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

/**
 * @swagger
 * /api/carts/add:
 *   post:
 *     summary: Add item to cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               product:
 *                 type: string
 *                 description: ID of the product to add
 *                 example: 612e2cfb47f9b67e38b125f7
 *               quantity:
 *                 type: number
 *                 description: Quantity of the product to add
 *                 example: 2
 *     responses:
 *       '200':
 *         description: Item added to cart successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 cart:
 *                   $ref: '#/components/schemas/Cart'
 *       '400':
 *         description: Invalid product ID or product not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Invalid product id
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
 * /api/carts/view:
 *   get:
 *     summary: View cart for a user
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Cart retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 cart:
 *                   $ref: '#/components/schemas/Cart'
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
 * /api/carts/remove:
 *   delete:
 *     summary: Remove item from cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               product:
 *                 type: string
 *                 description: ID of the product to remove
 *                 example: 612e2cfb47f9b67e38b125f7
 *     responses:
 *       '200':
 *         description: Item removed from cart successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 cart:
 *                   $ref: '#/components/schemas/Cart'
 *       '400':
 *         description: Invalid product ID or product not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Invalid product id
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
 * /api/carts/update-quantity:
 *   put:
 *     summary: Update item quantity in cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               product:
 *                 type: string
 *                 description: ID of the product in cart
 *                 example: 612e2cfb47f9b67e38b125f7
 *               quantity:
 *                 type: number
 *                 description: New quantity of the product
 *                 example: 3
 *     responses:
 *       '200':
 *         description: Item quantity updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 cart:
 *                   $ref: '#/components/schemas/Cart'
 *       '400':
 *         description: Invalid product ID or product not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Invalid product id
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
