
import { COIN_TINT_FACTORY_ABI } from "./CoinTintFactoryABI";

export const FACTORY_ABI = COIN_TINT_FACTORY_ABI;

export const TOKEN_ABI = [
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function totalSupply() view returns (uint256)",
  "function balanceOf(address) view returns (uint256)",
  "function transfer(address to, uint256 amount) returns (bool)",
  "event Transfer(address indexed from, address indexed to, uint256 value)",
];
