import { ArrowRight, Zap } from 'lucide-react';

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,hsl(140_100%_50%/0.15)_0%,transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_80%,hsl(280_100%_60%/0.1)_0%,transparent_40%)]" />
      
      {/* Grid pattern */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(hsl(140 100% 50% / 0.1) 1px, transparent 1px),
            linear-gradient(90deg, hsl(140 100% 50% / 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />

      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 rounded-full px-4 py-2 mb-8 animate-float">
          <Zap className="w-4 h-4 text-primary" />
          <span className="text-primary font-mono text-sm">npm install @pump/swarm</span>
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6">
          <span className="text-foreground">bikini</span>{' '}
          <span className="gradient-text">Claude</span>
        </h1>

        <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-4 font-mono">
          <span className="text-primary">$NPM</span> — The Package Manager for Degens
        </p>

        <p className="text-lg text-muted-foreground/70 max-w-xl mx-auto mb-12">
          Transitioning from bloated test environments to a streamlined production swarm. 
          Deploy your bags with zero dependencies.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://pump.fun/coin/EkMNiWoasYkSTXj5k4rMZhjoYRmuh4V1i1KbkJ5Ppump"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex items-center gap-2 text-lg"
          >
            Buy $NPM
            <ArrowRight className="w-5 h-5" />
          </a>
          
          <a
            href="https://t.me/pumpswarm"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary inline-flex items-center gap-2 text-lg"
          >
            Join Swarm
          </a>
        </div>

        {/* Floating code snippets */}
        <div className="absolute left-4 top-1/3 hidden lg:block opacity-30 font-mono text-sm text-left text-muted-foreground">
          <div>const ticker = "$NPM";</div>
          <div className="text-primary">// verified ✓</div>
        </div>
        
        <div className="absolute right-4 top-1/2 hidden lg:block opacity-30 font-mono text-sm text-right text-muted-foreground">
          <div>await deploy(swarm);</div>
          <div className="text-secondary">// live 🚀</div>
        </div>
      </div>
    </section>
  );
};
