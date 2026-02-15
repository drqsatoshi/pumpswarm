import { useEffect } from 'react';
import { ExternalLink } from 'lucide-react';

// CoinMarketCap Widget Configuration
// For Solana tokens, we'll use the CoinMarketCap price widget
// Note: $NPM needs to be listed on CoinMarketCap to use their widgets
// Until then, we provide the ticker URL and manual integration instructions

const TICKER_SYMBOL = 'NPM';
const CMC_TICKER_URL = `https://coinmarketcap.com/currencies/${TICKER_SYMBOL.toLowerCase()}/`;

export const CoinMarketCapTicker = () => {
  useEffect(() => {
    // Load CoinMarketCap widget script if token is listed
    // This script will render the price ticker when the token is officially listed
    const script = document.createElement('script');
    script.src = 'https://files.coinmarketcap.com/static/widget/currency.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup script on unmount
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="terminal-window rounded-xl p-6 max-w-2xl mx-auto">
      <h3 className="text-primary text-glow font-mono text-lg mb-4">
        {'// COINMARKETCAP_TICKER'}
      </h3>

      <div className="space-y-6">
        {/* CoinMarketCap Ticker URL */}
        <div className="space-y-2">
          <span className="text-muted-foreground font-mono text-sm block">
            CoinMarketCap Ticker URL:
          </span>
          <a
            href={CMC_TICKER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-muted/50 rounded-lg p-4 hover:bg-muted transition-colors group"
          >
            <code className="text-sm text-primary flex-1">
              {CMC_TICKER_URL}
            </code>
            <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
          </a>
        </div>

        {/* CoinMarketCap Widget Embed */}
        <div className="space-y-2">
          <span className="text-muted-foreground font-mono text-sm block">
            Price Widget:
          </span>
          <div className="bg-muted/30 rounded-lg p-4 border border-border/50">
            {/* CoinMarketCap Price Widget */}
            <div
              className="coinmarketcap-currency-widget"
              data-currencyid="1"
              data-base="USD"
              data-secondary=""
              data-ticker="true"
              data-rank="true"
              data-marketcap="true"
              data-volume="true"
              data-statsticker="true"
              data-stats="USD"
            />

            {/* Fallback message while token is being listed */}
            <div className="text-center py-4">
              <p className="text-muted-foreground text-sm mb-2">
                🚀 $NPM Widget - Coming Soon
              </p>
              <p className="text-xs text-muted-foreground/70">
                Widget will activate once $NPM is listed on CoinMarketCap
              </p>
            </div>
          </div>
        </div>

        {/* API Integration Info */}
        <div className="space-y-2">
          <span className="text-muted-foreground font-mono text-sm block">
            API Integration:
          </span>
          <div className="bg-muted/30 rounded-lg p-4 border border-border/50">
            <code className="text-xs text-foreground/80 block mb-2">
              GET https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest
            </code>
            <code className="text-xs text-muted-foreground block">
              ?symbol={TICKER_SYMBOL}&amp;convert=USD
            </code>
          </div>
        </div>

        {/* Widget Embed Code */}
        <div className="space-y-2">
          <span className="text-muted-foreground font-mono text-sm block">
            Embed Code:
          </span>
          <div className="bg-muted/30 rounded-lg p-4 border border-border/50 overflow-x-auto">
            <pre className="text-xs text-foreground/80">
              <code>{`<!-- CoinMarketCap Widget -->
<script src="https://files.coinmarketcap.com/static/widget/currency.js"></script>
<div class="coinmarketcap-currency-widget"
     data-currencyid="[CMC_ID]"
     data-base="USD"
     data-ticker="true"
     data-rank="true"
     data-marketcap="true"
     data-volume="true">
</div>`}</code>
            </pre>
          </div>
        </div>

        {/* Direct Link */}
        <div className="pt-4 border-t border-border/50">
          <a
            href={CMC_TICKER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary w-full inline-flex items-center justify-center gap-2"
          >
            View $NPM on CoinMarketCap
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
};
