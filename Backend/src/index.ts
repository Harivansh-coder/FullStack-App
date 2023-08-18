// index.ts file is the entry point of the application.

import express from "express";
import userRouter from "./router/user";
import dotenv from "dotenv";
import mongoose, { mongo } from "mongoose";
import rateLimitMiddleware from "./middleware/ratelimit";

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

// Mount the controller at /api
app.get("/api", (req, res) => {
  res.send("The sedulous hyena ate the antelope!");
});

// login and register route
app.use("/api/users", userRouter);

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
