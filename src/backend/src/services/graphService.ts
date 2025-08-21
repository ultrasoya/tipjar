import { gql, request as graphqlRequest } from "graphql-request";

export const fetchSubgraphData = async () => {
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