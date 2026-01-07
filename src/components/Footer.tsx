import { Terminal, MessageCircle, Globe } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="border-t border-border py-12 mt-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <Terminal className="w-5 h-5 text-primary" />
            <span className="font-mono text-muted-foreground">
              $<span className="text-primary">NPM</span> © 2025
            </span>
          </div>

          <div className="flex items-center gap-6">
            <a
              href="https://t.me/pumpswarm"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              <span className="font-mono text-sm">Telegram</span>
            </a>
            
            <a
              href="https://pump.fun/coin/EkMNiWoasYkSTXj5k4rMZhjoYRmuh4V1i1KbkJ5Ppump"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-muted-foreground hover:text-secondary transition-colors"
            >
              <Globe className="w-5 h-5" />
              <span className="font-mono text-sm">Pump.fun</span>
            </a>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-xs text-muted-foreground/50 font-mono">
            // This is a meme token. Not financial advice. DYOR.
          </p>
        </div>
      </div>
    </footer>
  );
};
