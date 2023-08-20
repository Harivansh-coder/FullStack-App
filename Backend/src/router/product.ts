// all product routes

import express from "express";
import {
  createProduct,
  getAllProducts,
  getProduct,
  deleteProduct,
  updateProduct,
} from "../controller/product";
import validateRequestBody from "../middleware/validate";
import { validateProduct, validateUpdateProduct } from "../utility/validate";
import verifyUserToken from "../middleware/authenticate";
import checkUserType from "../middleware/checkUser";

const productRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Product management
 */

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       '201':
 *         description: Product created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Product created successfully
 *       '400':
 *         description: Invalid category id or category does not exist
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Invalid category id or category does not exist
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
 * /products:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     responses:
 *       '200':
 *         description: List of products
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 products:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Product'
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
 * /products/{id}:
 *   get:
 *     summary: Get a product by ID
 *     tags: [Products]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the product
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Product details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       '400':
 *         description: Invalid product id
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Invalid product id
 *       '404':
 *         description: Product not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Product not found
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
 * /products/{id}:
 *   put:
 *     summary: Update a product by ID
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the product
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       '200':
 *         description: Updated product details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       '400':
 *         description: Invalid product id or category id
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Invalid product id or category id
 *       '404':
 *         description: Product not found or category does not exist
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Product not found or category does not exist
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
 * /products/{id}:
 *   delete:
 *     summary: Delete a product by ID
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the product
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '204':
 *         description: Product deleted successfully
 *       '400':
 *         description: Invalid product id
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Invalid product id
 *       '404':
 *         description: Product not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Product not found
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

// product route
productRouter.get("/", getAllProducts);

productRouter.get("/:id", getProduct);

productRouter.post(
  "/",
  verifyUserToken,
  checkUserType("seller"),
  validateRequestBody(validateProduct),
  createProduct
);

productRouter.put(
  "/:id",
  verifyUserToken,
  checkUserType("seller"),
  validateRequestBody(validateUpdateProduct),
  updateProduct
);

productRouter.delete(
  "/:id",
  verifyUserToken,
  checkUserType("seller"),
  deleteProduct
);

// export the productRouter
export default productRouter;
