import { Router, Request, Response } from "express";
import { fetchSubgraphData } from "../services";

const router = Router();

router.get("/donationsList", async (_req: Request, res: Response) => {
    try {
        const data = await fetchSubgraphData();
        return res.json(data);
    } catch (err) {
        console.error("Graphql connection error:", err);
        return res.status(500).json({ error: "Failed to connect to graphql" });
    }
});

export default router;