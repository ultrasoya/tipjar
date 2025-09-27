import { gql, request as graphqlRequest } from "graphql-request";
import { formatEther } from "ethers";
import { DEFAULT_DONATIONS_PAGE_SIZE } from "../routes/donationsList";

interface SubgraphDonation {
    donor: string;
    name: string;
    message: string;
    amount: string;
}

interface SubgraphResponse {
    newDonations: SubgraphDonation[];
}

export const fetchSubgraphData = async (page: number = 1, limit: number = DEFAULT_DONATIONS_PAGE_SIZE) => {
    const subgraphUrl = process.env["SUBGRAPH_URL"];
    const apiKey = process.env["SUBGRAPH_API_KEY"];
    
    if (!subgraphUrl) {
        throw new Error("SUBGRAPH_URL environment variable is not defined");
    }
    
    if (!apiKey) {
        throw new Error("SUBGRAPH_API_KEY environment variable is not defined");
    }

    const skip = (page - 1) * limit;
    const query = gql`{
        newDonations(first: ${limit}, skip: ${skip}, orderBy: blockTimestamp, orderDirection: desc) {
            donor
            name
            message
            amount
        }
    }`;
    
    const headers = { Authorization: `Bearer ${apiKey}` };

    const data = await graphqlRequest<SubgraphResponse>(subgraphUrl, query, headers);

    const processedData = {
        ...data,
        newDonations: data.newDonations.map((donation: SubgraphDonation) => ({
            ...donation,
            amount: formatEther(donation.amount)
        }))
    };

    return processedData;
};