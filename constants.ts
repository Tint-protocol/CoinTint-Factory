
import { Token } from './types';

export const MOCK_TOKENS: Token[] = [
  {
    id: '1',
    address: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
    name: 'SevenCoinTint Inu',
    symbol: 'SCTI',
    description: 'The flagship community mascot of the CoinTint ecosystem. Just a meme with deep liquidity and a high-performance protocol behind it on the Ink Network.',
    supply: '1,000,000,000',
    creator: '0x1234...5678',
    createdAt: new Date().toISOString(),
    image: 'https://images.unsplash.com/photo-1620336655055-088d06e36bf0?q=80&w=2574&auto=format&fit=crop',
    holders: 1240,
    marketCap: '$1.2M',
    website: 'https://cointint.com',
    twitter: 'cointint_factory',
    telegram: 'https://t.me/cointint',
    github: 'https://github.com/cointint'
  }
];
