// category router
import express from "express";
import { validateCategory } from "../utility/validate";
import validateRequestBody from "../middleware/validate";
import {
  createCategory,
  deleteCategory,
  getAllCategory,
  getCategory,
  updateCategory,
} from "../controller/category";

const categoryRouter = express.Router();

// category route
categoryRouter.get("/", getAllCategory);

categoryRouter.get("/:id", getCategory);

categoryRouter.post("/", validateRequestBody(validateCategory), createCategory);

categoryRouter.put(
  "/:id",
  validateRequestBody(validateCategory),
  updateCategory
);

categoryRouter.delete("/:id", deleteCategory);

// export the categoryRouter
export default categoryRouter;
