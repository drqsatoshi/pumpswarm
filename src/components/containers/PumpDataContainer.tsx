import { useEffect, useState } from 'react';
import { TrendingUp, RefreshCw, Rocket } from 'lucide-react';
import { fetchTokenData, refreshTokenData, checkGraduation, PumpTokenData } from '@/services/pumpService';

const TOKEN_ADDRESS = 'EkMNiWoasYkSTXj5k4rMZhjoYRmuh4V1i1KbkJ5Ppump';

/**
 * PumpDataContainer - Displays pump.fun token data and graduation status
 */
export const PumpDataContainer = () => {
  const [tokenData, setTokenData] = useState<PumpTokenData | null>(null);
  const [loading, setLoading] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  const loadTokenData = async () => {
    setLoading(true);
    try {
      const data = await fetchTokenData(TOKEN_ADDRESS);
      setTokenData(data);
      setLastUpdate(new Date());
    } catch (error) {
      console.error('Error fetching token data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setLoading(true);
    try {
      const data = await refreshTokenData(TOKEN_ADDRESS);
      setTokenData(data);
      setLastUpdate(new Date());
    } catch (error) {
      console.error('Error refreshing token data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTokenData();
  }, []);

  if (!tokenData) {
    return (
      <div className="terminal-window rounded-xl p-6">
        <div className="text-center text-muted-foreground">
          Loading token data...
        </div>
      </div>
    );
  }

  const graduation = checkGraduation(tokenData);
  const progress = (tokenData.market_cap / graduation.threshold) * 100;

  return (
    <div className="terminal-window rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-primary text-glow font-mono text-lg flex items-center gap-2">
          <TrendingUp className="w-5 h-5" />
          {'// PUMP_DATA'}
        </h3>
        
        <button
          onClick={handleRefresh}
          disabled={loading}
          className="btn-secondary text-sm flex items-center gap-2"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      <div className="space-y-4">
        {/* Market Cap */}
        <div className="bg-muted/30 rounded-lg p-4">
          <div className="text-xs text-muted-foreground mb-1">Market Cap</div>
          <div className="text-2xl font-bold text-primary">
            ${tokenData.market_cap.toLocaleString()}
          </div>
        </div>

        {/* Graduation Progress */}
        <div className="bg-muted/30 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="text-xs text-muted-foreground">Raydium Graduation</div>
            <Rocket className={`w-4 h-4 ${graduation.graduated ? 'text-primary' : 'text-muted-foreground'}`} />
          </div>
          
          <div className="mb-2">
            <div className="flex justify-between text-xs mb-1">
              <span className="text-muted-foreground">Progress</span>
              <span className="text-foreground font-mono">{progress.toFixed(1)}%</span>
            </div>
            <div className="w-full bg-muted/50 rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all ${graduation.graduated ? 'bg-primary' : 'bg-secondary'}`}
                style={{ width: `${Math.min(progress, 100)}%` }}
              />
            </div>
          </div>
          
          <div className="text-xs">
            <span className="text-muted-foreground">Target: </span>
            <span className="text-foreground font-mono">${graduation.threshold.toLocaleString()}</span>
          </div>
        </div>

        {/* Token Info */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-muted/20 rounded-lg p-3">
            <div className="text-xs text-muted-foreground">SOL Reserves</div>
            <div className="text-sm font-mono text-secondary">
              {(tokenData.virtual_sol_reserves / 1e9).toFixed(2)} SOL
            </div>
          </div>
          
          <div className="bg-muted/20 rounded-lg p-3">
            <div className="text-xs text-muted-foreground">Replies</div>
            <div className="text-sm font-mono text-accent">
              {tokenData.reply_count}
            </div>
          </div>
        </div>

        {/* Status */}
        <div className={`rounded-lg p-3 ${graduation.graduated ? 'bg-primary/20' : 'bg-secondary/20'}`}>
          <div className="text-sm font-mono">
            {graduation.graduated ? (
              <span className="text-primary">🎓 GRADUATED TO RAYDIUM</span>
            ) : (
              <span className="text-secondary">📈 ON PUMP.FUN BONDING CURVE</span>
            )}
          </div>
        </div>

        {lastUpdate && (
          <div className="text-xs text-muted-foreground text-center">
            Last updated: {lastUpdate.toLocaleTimeString()}
          </div>
        )}
      </div>
    </div>
  );
};
