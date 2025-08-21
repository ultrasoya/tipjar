import { JsonRpcProvider, Contract } from "ethers";
import { default as DonateContractAbi } from "./DonateContractAbi.json";
import { DonateContract } from "../types";

const provider = new JsonRpcProvider(`https://eth-sepolia.g.alchemy.com/v2/${process.env["ALCHEMY_API_KEY"]}`);
export const contract = new Contract(
  process.env["DONATE_CONTRACT_ADDRESS"] as string,
  DonateContractAbi.abi,
  provider
) as DonateContract;