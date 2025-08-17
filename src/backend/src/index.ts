import express from "express";
import { healthRouter, donationsRouter } from "./routes";


const app = express();
const port = 3000;

app.get('/', (_req, res) => {
    res.send("Hello World");
});

app.use('/', healthRouter);
app.use('/', donationsRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});