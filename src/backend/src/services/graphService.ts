import { gql, request as graphqlRequest } from "graphql-request";

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
            id
            donor
            name
            message
        }
    }`;
    
    const headers = { Authorization: `Bearer ${apiKey}` };

    const data = await graphqlRequest(subgraphUrl, query, headers);

    return data;
};