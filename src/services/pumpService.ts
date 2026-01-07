/**
 * Mock Pump.fun API Service
 * Simulates pump.fun API responses for testing when external API is unavailable
 */

export interface PumpTokenData {
  mint: string;
  name: string;
  symbol: string;
  description: string;
  image_uri: string;
  metadata_uri: string;
  twitter?: string;
  telegram?: string;
  bonding_curve: string;
  associated_bonding_curve: string;
  creator: string;
  created_timestamp: number;
  raydium_pool?: string;
  complete: boolean;
  virtual_sol_reserves: number;
  virtual_token_reserves: number;
  total_supply: number;
  website?: string;
  show_name: boolean;
  king_of_hill_timestamp?: number;
  market_cap: number;
  reply_count: number;
  last_reply?: number;
  nsfw: boolean;
  market_id?: string;
  inverted?: boolean;
  usd_market_cap?: number;
}

/**
 * Mock token data for $NPM (pumpswarm)
 */
export const mockTokenData: PumpTokenData = {
  mint: 'EkMNiWoasYkSTXj5k4rMZhjoYRmuh4V1i1KbkJ5Ppump',
  name: 'bikini Claude',
  symbol: 'NPM',
  description: 'The developer-friendly memecoin. No dependencies. No vulnerabilities. Pure gains.',
  image_uri: 'https://pump.fun/coin/EkMNiWoasYkSTXj5k4rMZhjoYRmuh4V1i1KbkJ5Ppump',
  metadata_uri: '',
  telegram: 'https://t.me/pumpswarm',
  bonding_curve: 'BondingCurveAddress',
  associated_bonding_curve: 'AssocBondingCurveAddr',
  creator: 'CreatorAddress',
  created_timestamp: Date.now() - 86400000 * 7, // 7 days ago
  complete: false, // Not graduated yet
  virtual_sol_reserves: 30000000000, // 30 SOL
  virtual_token_reserves: 1073000000000000,
  total_supply: 1000000000000000,
  show_name: true,
  market_cap: 45000, // $45k - not yet at graduation threshold
  reply_count: 42,
  nsfw: false,
  usd_market_cap: 45000,
};

/**
 * Check if token has graduated to Raydium
 * A token graduates when market cap reaches ~$69k
 */
export function checkGraduation(tokenData: PumpTokenData): {
  graduated: boolean;
  marketCap: number;
  threshold: number;
  readyForProduction: boolean;
} {
  const GRADUATION_THRESHOLD = 69000; // $69k
  const graduated = tokenData.complete || tokenData.market_cap >= GRADUATION_THRESHOLD;
  
  return {
    graduated,
    marketCap: tokenData.market_cap,
    threshold: GRADUATION_THRESHOLD,
    readyForProduction: graduated,
  };
}

/**
 * Simulate fetching token data from pump.fun
 */
export async function fetchTokenData(mintAddress: string): Promise<PumpTokenData | null> {
  // In a real implementation, this would fetch from the API
  // For testing purposes, return mock data if address matches
  if (mintAddress === mockTokenData.mint) {
    return mockTokenData;
  }
  return null;
}

/**
 * Refresh token data (simulated)
 */
export async function refreshTokenData(mintAddress: string): Promise<PumpTokenData | null> {
  const data = await fetchTokenData(mintAddress);
  if (!data) return null;
  
  // Simulate realistic market activity with bounded changes
  const marketCapChange = (Math.random() - 0.5) * 200; // +/- $100 change
  const solChange = (Math.random() - 0.5) * 2000000000; // +/- 2 SOL change
  const replyChange = Math.random() < 0.3 ? Math.floor(Math.random() * 3) : 0; // 30% chance of 0-2 new replies
  
  const updatedData = {
    ...data,
    market_cap: Math.max(1000, data.market_cap + marketCapChange), // Minimum $1k, realistic change
    virtual_sol_reserves: Math.max(0, data.virtual_sol_reserves + solChange),
    reply_count: data.reply_count + replyChange,
  };
  
  return updatedData;
}
