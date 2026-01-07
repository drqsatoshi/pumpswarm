/**
 * Pump.fun API Service
 * Fetches token data from pump.fun for the $NPM token
 */

import { 
  PUMP_FUN_API_BASE, 
  CONTRACT_ADDRESS, 
  GRADUATION_THRESHOLD_SOL, 
  MAX_PROGRESS_BEFORE_COMPLETE,
  DEFAULT_REFRESH_INTERVAL_MS 
} from './constants';

export interface PumpFunTokenData {
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
  king_of_the_hill_timestamp?: number;
  market_cap: number;
  reply_count: number;
  last_reply: number;
  nsfw: boolean;
  market_id?: string;
  inverted?: boolean;
  usd_market_cap?: number;
}

export class PumpFunApiError extends Error {
  constructor(message: string, public statusCode?: number) {
    super(message);
    this.name = 'PumpFunApiError';
  }
}

/**
 * Fetch token data from pump.fun API
 */
export async function fetchTokenData(tokenAddress: string = CONTRACT_ADDRESS): Promise<PumpFunTokenData> {
  try {
    const response = await fetch(`${PUMP_FUN_API_BASE}/coins/${tokenAddress}`);
    
    if (!response.ok) {
      throw new PumpFunApiError(
        `Failed to fetch token data: ${response.statusText}`,
        response.status
      );
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof PumpFunApiError) {
      throw error;
    }
    throw new PumpFunApiError(
      `Network error while fetching token data: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}

/**
 * Check if token has graduated to Raydium
 */
export function hasGraduatedToRaydium(tokenData: PumpFunTokenData): boolean {
  return tokenData.complete === true && !!tokenData.raydium_pool;
}

/**
 * Get token market cap in USD
 */
export function getMarketCap(tokenData: PumpFunTokenData): number {
  return tokenData.usd_market_cap || tokenData.market_cap || 0;
}

/**
 * Get bonding curve progress (0-100)
 */
export function getBondingCurveProgress(tokenData: PumpFunTokenData): number {
  if (tokenData.complete) return 100;
  
  // Calculate based on virtual reserves if available
  const solReserves = tokenData.virtual_sol_reserves || 0;
  
  if (solReserves === 0) return 0;
  
  const progress = (solReserves / GRADUATION_THRESHOLD_SOL) * 100;
  return Math.min(Math.round(progress), MAX_PROGRESS_BEFORE_COMPLETE); // Cap at 99% until complete
}

/**
 * Fetch and refresh token data periodically
 */
export async function startTokenDataRefresh(
  callback: (data: PumpFunTokenData) => void,
  intervalMs: number = DEFAULT_REFRESH_INTERVAL_MS
): Promise<() => void> {
  // Initial fetch
  try {
    const data = await fetchTokenData();
    callback(data);
  } catch (error) {
    console.error('Error fetching initial token data:', error);
  }
  
  // Set up periodic refresh
  const intervalId = setInterval(async () => {
    try {
      const data = await fetchTokenData();
      callback(data);
    } catch (error) {
      console.error('Error refreshing token data:', error);
    }
  }, intervalMs);
  
  // Return cleanup function
  return () => clearInterval(intervalId);
}
