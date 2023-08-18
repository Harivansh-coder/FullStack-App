// index.ts file is the entry point of the application.

import express from "express";
import userRouter from "./router/user";

// Create a new express application instance
const app: express.Application = express();

// The port the express app will listen on
const PORT = 3000;

// Applying middleware
app.use(express.json());

// Mount the controller at /api
app.get("/api", (req, res) => {
  res.send("The sedulous hyena ate the antelope!");
});

// login and register route
app.use("/api/users", userRouter);

// Serve the application at the given port
app.listen(PORT, () => {
  // Success callback
  console.log(`Listening at http://localhost:${PORT}/`);
});
