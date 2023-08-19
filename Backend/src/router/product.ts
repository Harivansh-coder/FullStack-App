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
