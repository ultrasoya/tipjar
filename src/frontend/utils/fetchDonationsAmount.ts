const fetchDonationsAmount = async () => {
    const response = await fetch("/api/donationsamount");
    const data = await response.json();
    return data;
};

export default fetchDonationsAmount;