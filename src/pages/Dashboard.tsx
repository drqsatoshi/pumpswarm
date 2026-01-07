import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { WalletContainer } from '@/components/containers/WalletContainer';
import { SwarmContainer } from '@/components/containers/SwarmContainer';
import { TransactionContainer } from '@/components/containers/TransactionContainer';
import { EventLogContainer } from '@/components/containers/EventLogContainer';
import { WalletProvider } from '@/contexts/WalletContext';
import { SwarmProvider } from '@/contexts/SwarmContext';
import { NotificationListener } from '@/components/NotificationListener';
import { Terminal } from 'lucide-react';

const Dashboard = () => {
  return (
    <WalletProvider>
      <SwarmProvider>
        <NotificationListener />
        
        <div className="min-h-screen bg-background">
          {/* Header with wallet */}
          <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Terminal className="w-6 h-6 text-primary" />
                <span className="font-mono font-bold text-lg text-foreground">
                  $<span className="text-primary">NPM</span>
                  <span className="text-muted-foreground text-sm ml-2">// dashboard</span>
                </span>
              </div>
              
              <WalletContainer />
            </div>
          </header>

          {/* Main content */}
          <main className="pt-24 pb-12">
            <div className="container mx-auto px-4">
              <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">
                  <span className="text-muted-foreground">{'>'}</span>{' '}
                  <span className="gradient-text">Swarm Dashboard</span>
                </h1>
                <p className="text-muted-foreground font-mono">
                  {'// Connect, monitor, and interact with the pumpswarm protocol'}
                </p>
              </div>

              <div className="grid lg:grid-cols-2 gap-6">
                <SwarmContainer />
                <TransactionContainer />
              </div>

              <div className="mt-6">
                <EventLogContainer />
              </div>

              {/* TODO placeholders */}
              <div className="mt-6 grid md:grid-cols-3 gap-4">
                <div className="terminal-window rounded-xl p-6 opacity-50">
                  <h4 className="text-muted-foreground font-mono mb-2">{'// TODO: LIQUIDITY'}</h4>
                  <p className="text-xs text-muted-foreground/50">Pool metrics and LP positions</p>
                </div>
                <div className="terminal-window rounded-xl p-6 opacity-50">
                  <h4 className="text-muted-foreground font-mono mb-2">{'// TODO: AIRDROP'}</h4>
                  <p className="text-xs text-muted-foreground/50">Claim interface with merkle proofs</p>
                </div>
                <div className="terminal-window rounded-xl p-6 opacity-50">
                  <h4 className="text-muted-foreground font-mono mb-2">{'// TODO: GOVERNANCE'}</h4>
                  <p className="text-xs text-muted-foreground/50">Voting and proposals</p>
                </div>
              </div>
            </div>
          </main>

          <Footer />
        </div>
      </SwarmProvider>
    </WalletProvider>
  );
};

export default Dashboard;
