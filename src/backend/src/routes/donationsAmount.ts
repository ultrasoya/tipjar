import dotenv from "dotenv";
import { Router, Request, Response } from "express";
import { JsonRpcProvider, Contract, formatEther } from "ethers";
import { DonateContractAbi } from "../services";
import { DonateContract } from "../types";

dotenv.config();

const router = Router();

const getTotalDonations = async (contract: DonateContract): Promise<bigint> => {
    const totalDonations = await contract.totalDonations();
    return totalDonations;
};

router.get("/donationsAmount", async (_req: Request, res: Response) => {
    const provider = new JsonRpcProvider(`https://eth-sepolia.g.alchemy.com/v2/${process.env["ALCHEMY_API_KEY"]}`);
    
    if (!process.env["DONATE_CONTRACT_ADDRESS"]) {
        return res.status(500).json({ error: "Contract address not configured" });
    }
    
    try {
        const contract = new Contract(process.env["DONATE_CONTRACT_ADDRESS"], DonateContractAbi.abi, provider) as DonateContract;
        const totalDonations = await getTotalDonations(contract);
        const totalDonationsInEther = formatEther(totalDonations);
        return res.json({ message: "Contract connected successfully", totalDonations: totalDonationsInEther });
    } catch (err) {
        console.error("Contract connection error:", err);
        return res.status(500).json({ error: "Failed to connect to contract" });
    }
});

export default router;