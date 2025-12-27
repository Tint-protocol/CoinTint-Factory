
export interface Token {
  id: string;
  address: string;
  name: string;
  symbol: string;
  description: string;
  supply: string;
  creator: string;
  createdAt: string;
  image: string;
  holders?: number;
  marketCap?: string;
  website?: string;
  twitter?: string;
  github?: string;
  telegram?: string;
}

export interface WalletState {
  isConnected: boolean;
  address: string | null;
  chainId: number | null;
}

export interface CreateTokenForm {
  name: string;
  symbol: string;
  description: string;
  website: string;
  twitter: string;
  github: string;
  telegram: string;
  imageFile: File | undefined;
}

// Added missing AIResponse interface to fix the import error in geminiService.ts
export interface AIResponse {
  name: string;
  symbol: string;
  description: string;
  marketingPlan: string;
  tokenomics: {
    tax: string;
    liquidity: string;
    marketing: string;
  };
}

export enum View {
  HOME = 'HOME',
  FACTORY = 'FACTORY'
}
