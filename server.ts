import express from "express";
import type { Express, Request, Response } from "express";

// Create Express App
const app: Express = express();
const PORT = process.env.PORT || 3000;

// Routes
app.get("/", (req: Request, res: Response) => {
  res.send("Tinkering with OpenAI");
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
