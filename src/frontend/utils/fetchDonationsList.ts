import { DEFAULT_DONATIONS_PAGE_SIZE } from "../constants";

const fetchDonationsList = async (page: number = 1, limit: number = DEFAULT_DONATIONS_PAGE_SIZE) => {
    const response = await fetch(`/api/donationslist?page=${page}&limit=${limit}`);
    const data = await response.json();
    return data;
};

export default fetchDonationsList;