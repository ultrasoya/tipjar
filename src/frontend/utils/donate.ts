import { ethers } from "ethers";
import DonateContractAbi from "../../shared/contracts/DonateContractAbi.json";

// Расширяем тип Window для поддержки ethereum
declare global {
    interface Window {
        ethereum?: {
            request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
            on: (event: string, callback: (...args: unknown[]) => void) => void;
            removeListener: (event: string, callback: (...args: unknown[]) => void) => void;
        };
    }
}

async function donate(amount: string, name: string, message: string) {
    // Проверяем наличие MetaMask
    if (!window.ethereum) {
        throw new Error("MetaMask не установлен");
    }

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    // Используем адрес контракта из деплоя
    const contractAddress = "0x4663ba9079D5577718105635d614C8F965C8f734";

    if (!contractAddress) {
        throw new Error("Адрес контракта не найден");
    }

    const contract = new ethers.Contract(contractAddress, DonateContractAbi, signer);

    // Конвертируем amount в wei
    const amountInWei = ethers.parseEther(amount);

    const tx = await contract.donate(name, message, { value: amountInWei });

    console.log("Transaction sent:", tx);

    const receipt = await tx.wait();

    console.log("Transaction mined:", receipt);

    return receipt;
};

export default donate;