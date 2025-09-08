import { Router, Request, Response } from "express";
import { fetchSubgraphData } from "../services";

export const DEFAULT_DONATIONS_PAGE_SIZE = 10;

const router = Router();

router.get("/donationsList", async (req: Request, res: Response) => {
    try {
        const { page: pageStr, limit: limitStr } = req.query as Record<string, string | undefined>;
        const page = parseInt(pageStr ?? "") || 1;
        const limit = parseInt(limitStr ?? "") || DEFAULT_DONATIONS_PAGE_SIZE;
        
        const data = await fetchSubgraphData(page, limit);
        return res.json(data);
    } catch (err) {
        console.error("Graphql connection error:", err);
        return res.status(500).json({ error: "Failed to connect to graphql" });
    }
});

export default router;