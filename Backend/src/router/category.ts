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
import verifyUserToken from "../middleware/authenticate";
import checkUserType from "../middleware/checkUser";

const categoryRouter = express.Router();

// category route
categoryRouter.get("/", getAllCategory);

categoryRouter.get("/:id", getCategory);

categoryRouter.post(
  "/",
  verifyUserToken,
  checkUserType("seller"),
  validateRequestBody(validateCategory),
  createCategory
);

categoryRouter.put(
  "/:id",
  verifyUserToken,
  checkUserType("seller"),
  validateRequestBody(validateCategory),
  updateCategory
);

categoryRouter.delete(
  "/:id",
  verifyUserToken,
  checkUserType("seller"),
  deleteCategory
);

// export the categoryRouter
export default categoryRouter;
