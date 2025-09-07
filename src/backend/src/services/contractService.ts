import { JsonRpcProvider, Contract } from "ethers";
import DonateContractAbi from "@shared/contracts/DonateContractAbi.json";
import type { DonateContract } from "../types";

const alchemyApiKey = process.env["ALCHEMY_API_KEY"];
const contractAddress = process.env["DONATE_CONTRACT_ADDRESS"];

if (!alchemyApiKey) {
    throw new Error("ALCHEMY_API_KEY environment variable is not defined");
}

if (!contractAddress) {
    throw new Error("DONATE_CONTRACT_ADDRESS environment variable is not defined");
}

const provider = new JsonRpcProvider(`https://eth-sepolia.g.alchemy.com/v2/${alchemyApiKey}`);
export const contract = new Contract(
  contractAddress,
  DonateContractAbi,
  provider
) as unknown as DonateContract;