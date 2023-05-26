import express from "express";
import dotenv from "dotenv";
import { Configuration, OpenAIApi } from "openai";
import type { Express, Request, Response } from "express";

// Load environment variables
dotenv.config();

const configuration = new Configuration({
  organization: process.env.OPENAI_ORGANIZATION,
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

// Create Express App
const app: Express = express();
const PORT = process.env.PORT || 3000;

app.get("/", (_req: Request, res: Response) => {
  res.send("Hello world!");
});

// Routes
app.get("/api", async (_req: Request, _res: Response) => {
  // res.send("Hello world!");
  try {
    // Make the API request using OpenAI
    const response = await openai.listModels();
    // Process the API response
    _res.send(response.data);
  } catch (error) {
    // Handle any errors that occurred during the API request
    console.error("API request error:", error);
    _res.status(500).send("API request failed");
  }
});

// POST API route
app.post("/api/chat", async (_req: Request, _res: Response) => {
  try {
    const { prompt } = _req.body;
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
    });
    console.log(completion.data.choices[0].text);
    _res.send(completion.data.choices[0].text);
  } catch (error: any) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
