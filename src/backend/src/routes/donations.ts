import dotenv from "dotenv";
import { Router, Request, Response } from "express";
import { JsonRpcProvider, Contract } from "ethers";
import { DonateContractAbi } from "../services";

dotenv.config();

const router = Router();

router.get("/donations", async (req: Request, res: Response) => {
    const provider = new JsonRpcProvider(`https://eth-sepolia.g.alchemy.com/v2/${process.env["ALCHEMY_API_KEY"]}`);
    
    if (!process.env["DONATE_CONTRACT_ADDRESS"]) {
        return res.status(500).json({ error: "Contract address not configured" });
    }
    
    try {
        const contract = new Contract(process.env["DONATE_CONTRACT_ADDRESS"], DonateContractAbi.abi, provider);
        console.log("Contract connected:", contract["address"]);
        res.json({ message: "Contract connected successfully" });
    } catch (err) {
        console.error("Contract connection error:", err);
        res.status(500).json({ error: "Failed to connect to contract" });
    }
});

export default router;