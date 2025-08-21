import express from "express";
import { healthRouter, donationsListRouter, donationsAmountRouter, eventsRouter } from "./routes";
import { donationListener } from "./listeners";

const app = express();
const port = 3000;

app.use('/', healthRouter);
app.use('/', donationsListRouter);
app.use('/', donationsAmountRouter);
app.use('/', eventsRouter);

donationListener();

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});