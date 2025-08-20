import dotenv from "dotenv";
import { gql, request as graphqlRequest } from "graphql-request";
import { Router, Request, Response } from "express";
import { Contract, formatEther, JsonRpcProvider } from "ethers";
import { DonateContractAbi } from "../services";
import { DonateContract } from "../types";

dotenv.config();

const router = Router();

const fetchSubgraphData = async () => {
    const query = gql`{
        newDonations(first: 10) {
            id
            donor
            name
            message
        }
    }`;
    const headers = { Authorization: `Bearer ${process.env["SUBGRAPH_API_KEY"]}` };

    const data = await graphqlRequest(process.env["SUBGRAPH_URL"] as string, query, headers);

    return data;
};

router.get("/donationsList", async (_req: Request, res: Response) => {
    try {
        const data = await fetchSubgraphData();
        return res.json(data);
    } catch (err) {
        console.error("Graphql connection error:", err);
        return res.status(500).json({ error: "Failed to connect to graphql" });
    }
});

// const provider = new JsonRpcProvider(`https://eth-sepolia.g.alchemy.com/v2/${process.env["ALCHEMY_API_KEY"]}`);
// const contract = new Contract(
//   process.env["DONATE_CONTRACT_ADDRESS"] as string,
//   DonateContractAbi.abi,
//   provider
// ) as DonateContract;

// contract.on("NewDonation", async (donor, name, message, amount, event) => {
//   console.log("🔥 Событие NewDonation поймано:", { donor, name, message, amount: formatEther(amount) });

//   try {
//     const history = await fetchSubgraphData();
//     console.log("📖 Обновлённая история:", history);
//     // тут можно сохранить history в память/БД, или пушить на фронт через WS
//   } catch (err) {
//     console.error("Ошибка при запросе The Graph:", err);
//   }
// });


export default router;