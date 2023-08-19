// category router
import express from "express";

const categoryRouter = express.Router();

// category route
categoryRouter.get("/", (req, res) => {
  res.send("Get all categories");
});

categoryRouter.get("/:id", (req, res) => {
  res.send("Get a category");
});

categoryRouter.post("/", (req, res) => {
  res.send("Create a category");
});

categoryRouter.put("/:id", (req, res) => {
  res.send("Update a category");
});

categoryRouter.delete("/:id", (req, res) => {
  res.send("Delete a category");
});

// export the categoryRouter
export default categoryRouter;
