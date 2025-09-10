import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import { healthRouter, donationsListRouter, donationsAmountRouter, eventsRouter } from "./routes";
import { donationListener } from "./listeners";

const app = express();
const port = process.env["PORT"] || 30000;

app.use(cors());

app.use((req, _res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  next();
});

app.use('/api', healthRouter);
app.use('/api', donationsListRouter);
app.use('/api', donationsAmountRouter);
app.use('/api', eventsRouter);

donationListener();

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
