import { Terminal } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <Terminal className="w-6 h-6 text-primary" />
          <span className="font-mono font-bold text-lg text-foreground">
            $<span className="text-primary">NPM</span>
          </span>
        </Link>
        
        <nav className="flex items-center gap-4">
          <Link
            to="/dashboard"
            className="text-muted-foreground hover:text-foreground transition-colors font-mono text-sm"
          >
            Dashboard
          </Link>
          <a
            href="https://pump.fun/coin/EkMNiWoasYkSTXj5k4rMZhjoYRmuh4V1i1KbkJ5Ppump"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-sm"
          >
            Buy on Pump.fun
          </a>
        </nav>
      </div>
    </header>
  );
};
