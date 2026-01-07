import { useState, useEffect, useCallback } from 'react';
import { 
  fetchTokenData, 
  PumpFunTokenData, 
  PumpFunApiError,
  hasGraduatedToRaydium,
  getBondingCurveProgress,
  getMarketCap
} from '@/lib/pumpFunApi';
import { DEFAULT_REFRESH_INTERVAL_MS } from '@/lib/constants';
import { eventBus } from '@/lib/eventBus';

interface UsePumpFunDataOptions {
  autoRefresh?: boolean;
  refreshInterval?: number; // in milliseconds
}

interface UsePumpFunDataResult {
  data: PumpFunTokenData | null;
  loading: boolean;
  error: Error | null;
  refresh: () => Promise<void>;
  hasGraduated: boolean;
  bondingCurveProgress: number;
  marketCap: number;
}

/**
 * Hook to fetch and manage pump.fun token data
 */
export function usePumpFunData(options: UsePumpFunDataOptions = {}): UsePumpFunDataResult {
  const { autoRefresh = true, refreshInterval = DEFAULT_REFRESH_INTERVAL_MS } = options;
  
  const [data, setData] = useState<PumpFunTokenData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const refresh = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const tokenData = await fetchTokenData();
      setData(tokenData);
      
      // Emit event for other components
      eventBus.emit('swarm:message', {
        from: 'pump-fun-api',
        payload: { type: 'token-data-updated', data: tokenData }
      });
      
      // Check for Raydium graduation
      if (hasGraduatedToRaydium(tokenData)) {
        eventBus.emit('ui:notification', {
          type: 'success',
          message: '🎉 Token has graduated to Raydium!'
        });
      }
    } catch (err) {
      const errorMessage = err instanceof PumpFunApiError 
        ? err.message 
        : 'Failed to fetch token data';
      setError(new Error(errorMessage));
      eventBus.emit('ui:notification', {
        type: 'error',
        message: errorMessage
      });
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial fetch and auto-refresh setup
  useEffect(() => {
    refresh();

    if (autoRefresh) {
      const intervalId = setInterval(refresh, refreshInterval);
      return () => clearInterval(intervalId);
    }
  }, [refresh, autoRefresh, refreshInterval]);

  const hasGraduated = data ? hasGraduatedToRaydium(data) : false;
  const bondingCurveProgress = data ? getBondingCurveProgress(data) : 0;
  const marketCap = data ? getMarketCap(data) : 0;

  return {
    data,
    loading,
    error,
    refresh,
    hasGraduated,
    bondingCurveProgress,
    marketCap,
  };
}
