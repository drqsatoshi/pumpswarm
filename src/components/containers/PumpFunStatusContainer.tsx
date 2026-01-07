import { usePumpFunData } from '@/hooks/usePumpFunData';
import { DEFAULT_REFRESH_INTERVAL_MS, REFRESH_ANIMATION_DURATION } from '@/lib/constants';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { RefreshCw, ExternalLink, TrendingUp, Rocket, CheckCircle2, Clock } from 'lucide-react';
import { useState } from 'react';

export const PumpFunStatusContainer = () => {
  const { data, loading, error, refresh, hasGraduated, bondingCurveProgress, marketCap } = usePumpFunData({
    autoRefresh: true,
    refreshInterval: DEFAULT_REFRESH_INTERVAL_MS,
  });

  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refresh();
    setTimeout(() => setIsRefreshing(false), REFRESH_ANIMATION_DURATION);
  };

  if (error) {
    return (
      <Card className="terminal-window">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-500">
            <span className="text-muted-foreground">{'>'}</span> Pump.fun Status
          </CardTitle>
          <CardDescription className="font-mono text-red-400">
            {'// error loading data'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-red-400 mb-4">{error.message}</p>
          <Button onClick={handleRefresh} variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Retry
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="terminal-window">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <span className="text-muted-foreground">{'>'}</span> Pump.fun Status
              {hasGraduated && (
                <Badge variant="default" className="ml-2 bg-green-500">
                  <Rocket className="w-3 h-3 mr-1" />
                  Graduated
                </Badge>
              )}
            </CardTitle>
            <CardDescription className="font-mono">
              {'// live data from pump.fun API'}
            </CardDescription>
          </div>
          <Button
            onClick={handleRefresh}
            variant="ghost"
            size="sm"
            disabled={loading || isRefreshing}
          >
            <RefreshCw className={`w-4 h-4 ${(loading || isRefreshing) ? 'animate-spin' : ''}`} />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {loading && !data ? (
          <div className="flex items-center justify-center py-8">
            <RefreshCw className="w-6 h-6 animate-spin text-primary" />
            <span className="ml-2 text-muted-foreground">Loading token data...</span>
          </div>
        ) : data ? (
          <div className="space-y-4">
            {/* Graduation Status */}
            <div className="p-4 rounded-lg bg-muted/50 border border-border">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-mono text-sm text-muted-foreground">Raydium Graduation</h4>
                {hasGraduated ? (
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                ) : (
                  <Clock className="w-5 h-5 text-yellow-500" />
                )}
              </div>
              
              {hasGraduated ? (
                <div className="space-y-2">
                  <p className="text-sm text-green-500 font-medium">✅ Graduated to Raydium!</p>
                  {data.raydium_pool && (
                    <div className="flex items-center gap-2">
                      <code className="text-xs text-muted-foreground break-all">
                        {data.raydium_pool}
                      </code>
                      <a
                        href={`https://raydium.io/swap/?inputMint=${data.raydium_pool}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary/80"
                      >
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-2">
                  <p className="text-sm text-yellow-500">Bonding curve in progress...</p>
                  <Progress value={bondingCurveProgress} className="h-2" />
                  <p className="text-xs text-muted-foreground">{bondingCurveProgress.toFixed(1)}% complete</p>
                </div>
              )}
            </div>

            {/* Market Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 rounded-lg bg-muted/30">
                <p className="text-xs text-muted-foreground font-mono mb-1">Market Cap</p>
                <p className="text-lg font-bold text-primary">
                  {marketCap > 0 ? `$${marketCap.toLocaleString(undefined, { maximumFractionDigits: 0 })}` : 'N/A'}
                </p>
              </div>
              
              <div className="p-3 rounded-lg bg-muted/30">
                <p className="text-xs text-muted-foreground font-mono mb-1">Status</p>
                <p className="text-lg font-bold text-secondary">
                  {data.complete ? 'Complete' : 'Active'}
                </p>
              </div>
            </div>

            {/* Token Info */}
            <div className="space-y-2 pt-2 border-t border-border/50">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground font-mono">Name:</span>
                <span className="text-foreground">{data.name}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground font-mono">Symbol:</span>
                <span className="text-primary font-bold">{data.symbol}</span>
              </div>
              {data.virtual_sol_reserves && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground font-mono">SOL Reserves:</span>
                  <span className="text-foreground">{data.virtual_sol_reserves.toFixed(2)} SOL</span>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-2 pt-2">
              <Button
                asChild
                variant="outline"
                size="sm"
                className="flex-1"
              >
                <a
                  href={`https://pump.fun/coin/${data.mint}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <TrendingUp className="w-4 h-4 mr-2" />
                  View on Pump.fun
                </a>
              </Button>
              {hasGraduated && data.raydium_pool && (
                <Button
                  asChild
                  variant="default"
                  size="sm"
                  className="flex-1"
                >
                  <a
                    href={`https://raydium.io/swap/?inputMint=${data.raydium_pool}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Rocket className="w-4 h-4 mr-2" />
                    Trade on Raydium
                  </a>
                </Button>
              )}
            </div>

            {/* Last Update */}
            <p className="text-xs text-muted-foreground text-center pt-2 border-t border-border/50">
              Auto-refreshing every 30s
            </p>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
};
