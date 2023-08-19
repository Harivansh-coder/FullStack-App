// all product routes

import express from "express";

const productRouter = express.Router();

// product route
productRouter.get("/", (req, res) => {
  res.send("Get all products");
});

productRouter.get("/:id", (req, res) => {
  res.send("Get a product");
});

productRouter.post("/", (req, res) => {
  res.send("Create a product");
});

productRouter.put("/:id", (req, res) => {
  res.send("Update a product");
});

productRouter.delete("/:id", (req, res) => {
  res.send("Delete a product");
});
// export the productRouter
export default productRouter;
