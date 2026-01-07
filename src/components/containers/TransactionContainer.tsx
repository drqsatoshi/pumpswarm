import { useState, useEffect } from 'react';
import { useEventListener } from '@/hooks/useEventBus';
import { ArrowUpRight, Clock, CheckCircle, XCircle } from 'lucide-react';

interface Transaction {
  id: string;
  type: string;
  status: 'pending' | 'confirmed' | 'failed';
  signature?: string;
  error?: string;
  timestamp: number;
}

/**
 * TransactionContainer - Empty container for transaction history
 * TODO: Fetch real transactions from Solana
 * TODO: Add transaction details modal
 * TODO: Add retry failed transactions
 * TODO: Add transaction simulation
 */
export const TransactionContainer = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEventListener('tx:pending', ({ id, type }) => {
    setTransactions(prev => [
      { id, type, status: 'pending' as const, timestamp: Date.now() },
      ...prev,
    ].slice(0, 10));
  });

  useEventListener('tx:confirmed', ({ id, signature }) => {
    setTransactions(prev =>
      prev.map(tx =>
        tx.id === id ? { ...tx, status: 'confirmed', signature } : tx
      )
    );
  });

  useEventListener('tx:failed', ({ id, error }) => {
    setTransactions(prev =>
      prev.map(tx =>
        tx.id === id ? { ...tx, status: 'failed', error } : tx
      )
    );
  });

  const getStatusIcon = (status: Transaction['status']) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-500 animate-pulse" />;
      case 'confirmed':
        return <CheckCircle className="w-4 h-4 text-primary" />;
      case 'failed':
        return <XCircle className="w-4 h-4 text-destructive" />;
    }
  };

  if (transactions.length === 0) {
    return (
      <div className="terminal-window rounded-xl p-6 text-center">
        <p className="text-muted-foreground font-mono">
          {'// No transactions yet'}
        </p>
      </div>
    );
  }

  return (
    <div className="terminal-window rounded-xl p-6">
      <h3 className="text-primary text-glow font-mono text-lg mb-4 flex items-center gap-2">
        <ArrowUpRight className="w-5 h-5" />
        {'// TRANSACTIONS'}
      </h3>

      <div className="space-y-3">
        {transactions.map(tx => (
          <div
            key={tx.id}
            className="flex items-center justify-between bg-muted/20 rounded-lg p-3"
          >
            <div className="flex items-center gap-3">
              {getStatusIcon(tx.status)}
              <div>
                <div className="font-mono text-sm text-foreground">{tx.type}</div>
                <div className="text-xs text-muted-foreground">
                  {new Date(tx.timestamp).toLocaleTimeString()}
                </div>
              </div>
            </div>
            
            {tx.signature && (
              <code className="text-xs text-muted-foreground">
                {tx.signature.slice(0, 8)}...
              </code>
            )}
          </div>
        ))}
      </div>

      {/* TODO: Add view all button */}
      {/* TODO: Add transaction explorer link */}
    </div>
  );
};
