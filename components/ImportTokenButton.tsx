import React from "react";
import { PlusCircle } from "lucide-react";

interface ImportTokenButtonProps {
  tokenAddress: string;
  symbol: string;
  decimals?: number;
  image?: string;
  className?: string;
}

const ImportTokenButton: React.FC<ImportTokenButtonProps> = ({
  tokenAddress,
  symbol,
  decimals = 18,
  image,
  className = "",
}) => {
  const importToken = async () => {
    if (!(window as any).ethereum) {
      alert("MetaMask not detected");
      return;
    }

    try {
      await (window as any).ethereum.request({
        method: "wallet_watchAsset",
        params: {
          type: "ERC20",
          options: {
            address: tokenAddress,
            symbol,
            decimals,
            image: image?.startsWith("ipfs://")
              ? `https://ipfs.io/ipfs/${image.replace("ipfs://", "")}`
              : image,
          },
        },
      });
    } catch (err) {
      console.error("Import token failed", err);
    }
  };

  return (
    <button
      onClick={importToken}
      className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold transition-all ${className}`}
    >
      <PlusCircle className="w-4 h-4" />
      Import to Wallet
    </button>
  );
};

export default ImportTokenButton;