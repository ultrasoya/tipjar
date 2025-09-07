import { gql, request as graphqlRequest } from "graphql-request";
import { formatEther } from "ethers";

interface SubgraphDonation {
    donor: string;
    name: string;
    message: string;
    amount: string;
}

interface SubgraphResponse {
    newDonations: SubgraphDonation[];
}

export const fetchSubgraphData = async () => {
    const subgraphUrl = process.env["SUBGRAPH_URL"];
    const apiKey = process.env["SUBGRAPH_API_KEY"];
    
    if (!subgraphUrl) {
        throw new Error("SUBGRAPH_URL environment variable is not defined");
    }
    
    if (!apiKey) {
        throw new Error("SUBGRAPH_API_KEY environment variable is not defined");
    }

    const query = gql`{
        newDonations(first: 10) {
            donor
            name
            message
            amount
        }
    }`;
    
    const headers = { Authorization: `Bearer ${apiKey}` };

    const data = await graphqlRequest<SubgraphResponse>(subgraphUrl, query, headers);

    // Конвертируем amount из gwei в ETH для каждого доната
    const processedData = {
        ...data,
        newDonations: data.newDonations.map((donation: SubgraphDonation) => ({
            ...donation,
            amount: formatEther(donation.amount)
        }))
    };

    return processedData;
};