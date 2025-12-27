import { ethers } from 'ethers';
import { FACTORY_ADDRESS } from '../lib/constants';
import { FACTORY_ABI } from '../lib/abis';

/**
 * Memasukkan RPC Network Ink secara otomatis jika belum ada di wallet user
 */
export const switchNetwork = async () => {
  if (!(window as any).ethereum) return;
  try {
    await (window as any).ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: '0xDEF1' }], // 57073
    });
  } catch (switchError: any) {
    if (switchError.code === 4902) {
      try {
        await (window as any).ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainId: '0xDEF1',
              chainName: 'Ink',
              nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
              rpcUrls: ['https://rpc-gel.inkonchain.com'],
              blockExplorerUrls: ['https://explorer.inkonchain.com'],
            },
          ],
        });
      } catch (addError) {
        console.error("Failed to add Ink network", addError);
      }
    }
  }
};

/**
 * Mengambil biaya pembuatan token langsung dari Smart Contract (Dynamic Fee)
 */
export const getCreationFee = async (): Promise<bigint> => {
  if (!(window as any).ethereum) return ethers.parseEther('0.002');
  try {
    const provider = new ethers.BrowserProvider((window as any).ethereum);
    const contract = new ethers.Contract(FACTORY_ADDRESS, FACTORY_ABI, provider);
    return await contract.creationFee();
  } catch (e) {
    console.error("Failed to fetch fee from contract", e);
    return ethers.parseEther('0.002');
  }
};

/**
 * Mengambil saldo native (ETH) di Ink Network
 */
export const getBalance = async (address: string): Promise<string> => {
  if (!(window as any).ethereum) return '0';
  try {
    const provider = new ethers.BrowserProvider((window as any).ethereum);
    const balance = await provider.getBalance(address);
    return ethers.formatEther(balance);
  } catch (e) {
    console.error("Balance fetch failed", e);
    return '0';
  }
};

/**
 * Menghubungkan wallet dan memastikan berada di network Ink
 */
export const connectWalletAction = async (): Promise<{ address: string; chainId: number; balance: string } | null> => {
  if (!(window as any).ethereum) {
    alert("MetaMask not detected. Please install it to use CoinTint.");
    return null;
  }

  try {
    await switchNetwork();
    const provider = new ethers.BrowserProvider((window as any).ethereum);
    const accounts = await provider.send("eth_requestAccounts", []);
    const network = await provider.getNetwork();
    const balance = await getBalance(accounts[0]);

    return {
      address: accounts[0],
      chainId: Number(network.chainId),
      balance
    };
  } catch (error) {
    console.error("Connection failed", error);
    return null;
  }
};

/**
 * Fungsi Utama: Membuat Coin di Blockchain Ink Network
 */
export const createCoinOnChain = async (params: { 
  name: string, 
  symbol: string, 
  totalSupply: bigint, 
  tokenURI: string 
}): Promise<string> => {
  if (!(window as any).ethereum) throw new Error("Wallet not connected");
  
  const provider = new ethers.BrowserProvider((window as any).ethereum);
  const signer = await provider.getSigner();
  
  const contract = new ethers.Contract(FACTORY_ADDRESS, FACTORY_ABI, signer);
  const fee = await contract.creationFee();
  
  try {
    const tx = await contract.createCoin(
      params.name,
      params.symbol,
      params.totalSupply,
      params.tokenURI,
      { value: fee }
    );
    
    const receipt = await tx.wait();
    
    // Parsing log untuk mendapatkan alamat token yang baru dibuat
    if (receipt && receipt.logs) {
      for (const log of receipt.logs) {
        try {
          const decodedLog = contract.interface.parseLog(log);
          if (decodedLog && decodedLog.name === 'CoinCreated') {
            return decodedLog.args.token;
          }
        } catch (e) {
          // Log ini mungkin bukan dari kontrak factory (misal: Transfer event dari token baru)
          continue;
        }
      }
      
      // Fallback: Jika parsing gagal tapi ada topics
      if (receipt.logs[0] && receipt.logs[0].topics.length >= 3) {
        return ethers.getAddress('0x' + receipt.logs[0].topics[2].slice(26));
      }
    }

    throw new Error("Transaction confirmed but token address not found in logs.");
  } catch (err: any) {
    console.error("Blockchain deployment error:", err);
    throw new Error(err.reason || err.message || "Smart contract execution failed");
  }
};