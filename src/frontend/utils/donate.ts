// import { ethers } from "ethers";
// import 

// async function donate(amount: string, currency: string) {
//     if (!window.ethereum) {
//         alert('Please install MetaMask!');
//         return;
//     }
    
//     await window.ethereum.request({
//         method: 'eth_requestAccounts',
//     });
    
//     const provider = new ethers.providers.Web3Provider(window.ethereum);
//     const signer = provider.getSigner();
    
//     const contract = new ethers.Contract(process.env.DONATE_CONTRACT_ADDRESS, DONATE_CONTRACT_ABI, signer);

//     const tx = await contract.donate(amount, currency);
//     await tx.wait();

//     return tx;
// }