// index.ts file is the entry point of the application.

import express from "express";
import userRouter from "./router/user";
import categoryRouter from "./router/category";
import productRouter from "./router/product";
import dotenv from "dotenv";
import mongoose from "mongoose";
import rateLimitMiddleware from "./middleware/ratelimit";
import cartRouter from "./router/cart";
import orderRouter from "./router/order";
import swaggerUi from "swagger-ui-express";
import specs from "./swagger-config";

// initialize configuration
dotenv.config();

// Create a new express application instance
const app: express.Application = express();

// The port the express app will listen on
const PORT = process.env.PORT || 3000;

// Applying middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(rateLimitMiddleware); // apply rate limit middleware to all routes

// Swagger UI
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs, {
    explorer: true,
  })
);

// Mount the controller at /api
app.get("/api", (_req, res) => {
  res.send("The sedulous hyena ate the antelope!");
});

// login and register route
app.use("/api/users", userRouter);

// category route
app.use("/api/categories", categoryRouter);

// product route
app.use("/api/products", productRouter);

// cart management route
app.use("/api/carts", cartRouter);

// order management route
app.use("/api/orders", orderRouter);

// connect to DB and Serve the application at the given port
mongoose
  .connect(process.env.MONGO_URL || "", {})
  .then(() => {
    console.log("Connected to database");
    app.listen(PORT, () => {
      console.log(`Listening at http://localhost:${PORT}/`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
