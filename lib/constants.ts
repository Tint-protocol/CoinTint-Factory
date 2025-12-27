
export const INK_CHAIN_ID = 57073;

export const INK_NETWORK_PARAMS = {
  chainId: "0xDEF1", // 57073
  chainName: "Ink",
  nativeCurrency: {
    name: "Ether",
    symbol: "ETH",
    decimals: 18,
  },
  rpcUrls: ["https://rpc-gel.inkonchain.com"],
  blockExplorerUrls: ["https://explorer.inkonchain.com"],
};

export const FACTORY_ADDRESS =
  (import.meta as any).env?.VITE_FACTORY_ADDRESS ||
  "0xC79f4e117715b9BD5057A9942Cdc792CF4AFA325";
