import { Copy, ExternalLink } from 'lucide-react';
import { useState } from 'react';

const CONTRACT_ADDRESS = 'EkMNiWoasYkSTXj5k4rMZhjoYRmuh4V1i1KbkJ5Ppump';

export const TokenInfo = () => {
  const [copied, setCopied] = useState(false);

  const copyAddress = () => {
    navigator.clipboard.writeText(CONTRACT_ADDRESS);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="terminal-window rounded-xl p-6 max-w-xl mx-auto">
      <h3 className="text-primary text-glow font-mono text-lg mb-4">
        {'// TOKEN_CONFIG'}
      </h3>
      
      <div className="space-y-4">
        <div className="flex justify-between items-center py-2 border-b border-border/50">
          <span className="text-muted-foreground font-mono">ticker:</span>
          <span className="text-primary font-bold text-xl">$NPM</span>
        </div>
        
        <div className="flex justify-between items-center py-2 border-b border-border/50">
          <span className="text-muted-foreground font-mono">name:</span>
          <span className="text-foreground">bikini Claude</span>
        </div>
        
        <div className="flex justify-between items-center py-2 border-b border-border/50">
          <span className="text-muted-foreground font-mono">chain:</span>
          <span className="text-secondary">Solana</span>
        </div>
        
        <div className="flex justify-between items-center py-2 border-b border-border/50">
          <span className="text-muted-foreground font-mono">platform:</span>
          <span className="text-accent">pump.fun</span>
        </div>
        
        <div className="pt-2">
          <span className="text-muted-foreground font-mono block mb-2">contract:</span>
          <div 
            onClick={copyAddress}
            className="flex items-center gap-2 bg-muted/50 rounded-lg p-3 cursor-pointer hover:bg-muted transition-colors group"
          >
            <code className="text-xs text-foreground/80 flex-1 break-all">
              {CONTRACT_ADDRESS}
            </code>
            <Copy className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
          </div>
          {copied && (
            <span className="text-primary text-sm mt-2 block animate-pulse">
              ✓ Copied to clipboard
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
