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

const productRouter = express.Router();

// product route
productRouter.get("/", getAllProducts);

productRouter.get("/:id", getProduct);

productRouter.post("/", validateRequestBody(validateProduct), createProduct);

productRouter.put(
  "/:id",
  validateRequestBody(validateUpdateProduct),
  updateProduct
);

productRouter.delete("/:id", deleteProduct);

// export the productRouter
export default productRouter;
