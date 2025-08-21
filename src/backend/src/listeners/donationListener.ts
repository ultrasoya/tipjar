import { formatEther } from "ethers";
import { contract } from "../services";
import { fetchSubgraphData } from "../services";
import { broadcastEvent } from "../routes/events";

export const donationListener = async () => {
    contract.on("NewDonation", async (donor, name, message, amount) => {
        
        try {
            const history = await fetchSubgraphData();
            console.log("🔥 NewDonation event received:", { donor, name, message, amount: formatEther(amount) });

            broadcastEvent({ donor, name, message, amount: formatEther(amount), history });
        } catch (err) {
            console.error("Error fetching subgraph data:", err);
        }
    });
};