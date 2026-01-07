import { useState, useEffect } from 'react';

const codeLines = [
  { prefix: '🔄', text: 'Initializing $NPM Protocol Handshake...' },
  { prefix: '✅', text: "Clean: No unsafe 'bikinify' artifacts detected." },
  { prefix: '📡', text: 'Connecting to Coordination Point: t.me/pumpswarm...' },
  { prefix: '🔒', text: 'Connection Secure.' },
  { prefix: '🚀', text: 'Loaded Package: @safe/pumpswarm v1.0.0' },
  { prefix: '💎', text: 'Ticker Context: $NPM (Validated)' },
  { prefix: '', text: '' },
  { prefix: '>>>', text: 'DEPLOYMENT SUCCESSFUL <<<' },
  { prefix: '', text: 'System is now live on the Pump Swarm.' },
];

export const TerminalWindow = () => {
  const [visibleLines, setVisibleLines] = useState(0);
  const [cursorVisible, setCursorVisible] = useState(true);

  useEffect(() => {
    const lineInterval = setInterval(() => {
      setVisibleLines((prev) => {
        if (prev >= codeLines.length) {
          clearInterval(lineInterval);
          return prev;
        }
        return prev + 1;
      });
    }, 400);

    const cursorInterval = setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, 530);

    return () => {
      clearInterval(lineInterval);
      clearInterval(cursorInterval);
    };
  }, []);

  return (
    <div className="terminal-window rounded-xl overflow-hidden max-w-2xl mx-auto">
      {/* Terminal Header */}
      <div className="flex items-center gap-2 px-4 py-3 bg-muted/50 border-b border-border">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
        </div>
        <span className="text-muted-foreground text-sm font-mono ml-2">
          verify-deployment.js
        </span>
      </div>

      {/* Terminal Content */}
      <div className="p-4 font-mono text-sm min-h-[300px] relative overflow-hidden">
        {/* Scanline effect */}
        <div className="absolute inset-0 scanline opacity-30" />
        
        <div className="relative z-10">
          <div className="text-muted-foreground mb-2">
            $ node verify-deployment.js
          </div>
          <div className="text-muted-foreground mb-4">{'>'}</div>

          {codeLines.slice(0, visibleLines).map((line, index) => (
            <div
              key={index}
              className={`mb-1 ${
                line.text.includes('SUCCESSFUL')
                  ? 'text-primary text-glow font-bold'
                  : line.text.includes('live')
                  ? 'text-secondary'
                  : 'text-foreground'
              }`}
            >
              {line.prefix && <span className="mr-2">{line.prefix}</span>}
              {line.text}
            </div>
          ))}

          {visibleLines >= codeLines.length && (
            <div className="mt-4 text-muted-foreground">
              ${' '}
              <span
                className={`inline-block w-2 h-4 bg-primary ${
                  cursorVisible ? 'opacity-100' : 'opacity-0'
                }`}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
