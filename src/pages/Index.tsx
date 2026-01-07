import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { TerminalWindow } from '@/components/TerminalWindow';
import { TokenInfo } from '@/components/TokenInfo';
import { Footer } from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            <span className="text-muted-foreground">{'>'}</span>{' '}
            <span className="text-foreground">Deployment</span>{' '}
            <span className="text-primary">Verified</span>
          </h2>
          <p className="text-muted-foreground text-center mb-12 font-mono">
            // running verification script...
          </p>
          <TerminalWindow />
        </div>
      </section>

      <section className="py-20 bg-muted/20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            <span className="text-secondary">Token</span>{' '}
            <span className="text-foreground">Config</span>
          </h2>
          <p className="text-muted-foreground text-center mb-12 font-mono">
            // package.json for your bags
          </p>
          <TokenInfo />
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="terminal-window rounded-xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4 text-foreground">
              Ready to <span className="text-primary">npm install</span>?
            </h3>
            <p className="text-muted-foreground mb-8">
              Join the swarm and deploy your position. No build errors. No bloatware.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://pump.fun/coin/EkMNiWoasYkSTXj5k4rMZhjoYRmuh4V1i1KbkJ5Ppump"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Buy on Pump.fun
              </a>
              <a
                href="https://t.me/pumpswarm"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                Join Telegram
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
