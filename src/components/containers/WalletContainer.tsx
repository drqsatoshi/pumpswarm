import { useWallet } from '@/contexts/WalletContext';
import { Wallet, LogOut, Loader2 } from 'lucide-react';
import { useState } from 'react';

/**
 * WalletContainer - Empty container for wallet UI
 * TODO: Integrate actual Solana wallet adapter
 * TODO: Add wallet selection modal
 * TODO: Add balance display
 * TODO: Add transaction history
 */
export const WalletContainer = () => {
  const { wallet, connect, disconnect } = useWallet();
  const [isLoading, setIsLoading] = useState(false);

  const handleConnect = async () => {
    setIsLoading(true);
    await connect();
    setIsLoading(false);
  };

  if (wallet.isConnected) {
    return (
      <div className="flex items-center gap-3">
        <div className="terminal-window rounded-lg px-4 py-2">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="font-mono text-sm text-foreground">
              {wallet.address}
            </span>
            {wallet.balance !== null && (
              <span className="text-muted-foreground text-xs">
                ({wallet.balance.toFixed(2)} SOL)
              </span>
            )}
          </div>
        </div>
        <button
          onClick={disconnect}
          className="p-2 rounded-lg bg-muted hover:bg-destructive/20 transition-colors"
        >
          <LogOut className="w-4 h-4 text-muted-foreground hover:text-destructive" />
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={handleConnect}
      disabled={isLoading}
      className="btn-secondary flex items-center gap-2"
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        <Wallet className="w-4 h-4" />
      )}
      Connect Wallet
    </button>
  );
};
