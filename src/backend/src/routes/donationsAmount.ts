import { Router, Request, Response } from "express";
import { formatEther } from "ethers";
import { contract } from "../services";

const router = Router();

const getTotalDonations = async () => {
    const totalDonations = await (contract as any).getTotalAmount();
    return totalDonations;
};

router.get("/donationsamount", async (_req: Request, res: Response) => {
    try {
        const totalDonations = await getTotalDonations();
        const totalDonationsInEther = formatEther(totalDonations);
        return res.json({ message: "Contract connected successfully", totalDonations: totalDonationsInEther });
    } catch (err) {
        console.error("Contract connection error:", err);
        return res.status(500).json({ error: "Failed to connect to contract" });
    }
});

export default router;