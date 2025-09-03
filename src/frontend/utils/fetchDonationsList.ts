const fetchDonationsList = async () => {
    const response = await fetch("/api/donationslist");
    const data = await response.json();
    return data;
};

export default fetchDonationsList;