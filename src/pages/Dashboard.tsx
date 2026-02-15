import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { WalletContainer } from '@/components/containers/WalletContainer';
import { SwarmContainer } from '@/components/containers/SwarmContainer';
import { TransactionContainer } from '@/components/containers/TransactionContainer';
import { EventLogContainer } from '@/components/containers/EventLogContainer';
import { PumpDataContainer } from '@/components/containers/PumpDataContainer';
import { WalletProvider } from '@/contexts/WalletContext';
import { SwarmProvider } from '@/contexts/SwarmContext';
import { NotificationListener } from '@/components/NotificationListener';
import { Terminal, Droplet, Gift, Vote } from 'lucide-react';

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
                <PumpDataContainer />
              </div>

              <div className="mt-6">
                <TransactionContainer />
              </div>

              <div className="mt-6">
                <EventLogContainer />
              </div>

              {/* Feature Cards */}
              <div className="mt-6 grid md:grid-cols-3 gap-4">
                <div className="terminal-window rounded-xl p-6 hover:border-primary/50 transition-colors">
                  <div className="flex items-center gap-2 mb-4">
                    <Droplet className="w-5 h-5 text-primary" />
                    <h4 className="text-foreground font-mono font-semibold">Liquidity Pools</h4>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Monitor pump.fun bonding curve liquidity and track SOL reserves
                  </p>
                  <div className="space-y-2 text-xs font-mono">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Bonding Curve:</span>
                      <span className="text-foreground">Active</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Progress:</span>
                      <span className="text-primary">→ Raydium</span>
                    </div>
                  </div>
                </div>

                <div className="terminal-window rounded-xl p-6 hover:border-primary/50 transition-colors">
                  <div className="flex items-center gap-2 mb-4">
                    <Gift className="w-5 h-5 text-primary" />
                    <h4 className="text-foreground font-mono font-semibold">Community Rewards</h4>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Holder rewards and developer incentive programs
                  </p>
                  <div className="space-y-2 text-xs font-mono">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Status:</span>
                      <span className="text-foreground">Coming Soon</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Type:</span>
                      <span className="text-primary">Dev Rewards</span>
                    </div>
                  </div>
                </div>

                <div className="terminal-window rounded-xl p-6 hover:border-primary/50 transition-colors">
                  <div className="flex items-center gap-2 mb-4">
                    <Vote className="w-5 h-5 text-primary" />
                    <h4 className="text-foreground font-mono font-semibold">Community Voice</h4>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Participate in community decisions and protocol upgrades
                  </p>
                  <div className="space-y-2 text-xs font-mono">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Active Polls:</span>
                      <span className="text-foreground">0</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Your Power:</span>
                      <span className="text-primary">Connect</span>
                    </div>
                  </div>
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
