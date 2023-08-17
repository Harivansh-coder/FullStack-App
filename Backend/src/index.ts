// index.ts file is the entry point of the application.

import express from "express";

// Create a new express application instance
const app: express.Application = express();

// The port the express app will listen on
const PORT = 3000;

// Mount the controller at /api
app.get("/api", (req, res) => {
  res.send("The sedulous hyena ate the antelope!");
});

// Serve the application at the given port
app.listen(PORT, () => {
    // Success callback
    console.log(`Listening at http://localhost:${PORT}/`);
    }
);
