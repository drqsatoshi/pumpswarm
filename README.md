# Welcome to your Lovable project

## Project info

**URL**: [solscan token address](https://solscan.io/token/EkMNiWoasYkSTXj5k4rMZhjoYRmuh4V1i1KbkJ5Ppump)

## Pumpswarm - The Developer's Memecoin

$NPM is a developer-friendly memecoin on Solana, currently on pump.fun bonding curve with automatic graduation to Raydium DEX when reaching ~$69k market cap.

### Token Information
- **Ticker**: $NPM
- **Name**: bikini Claude
- **Chain**: Solana
- **Platform**: pump.fun
- **Contract**: `EkMNiWoasYkSTXj5k4rMZhjoYRmuh4V1i1KbkJ5Ppump`
- **Telegram**: https://t.me/pumpswarm
- **Pump.fun**: https://pump.fun/coin/EkMNiWoasYkSTXj5k4rMZhjoYRmuh4V1i1KbkJ5Ppump

## Testing the Swarm

This project includes comprehensive testing scripts for the pump.fun environment:

### Test Scripts

```sh
# Test swarm readiness and API integration
npm run test:swarm

# Test API endpoints with curl
npm run test:curl

# Run full test suite (swarm test + build)
npm run test:all
```

### Test Results
See [TEST_RESULTS.md](./TEST_RESULTS.md) for detailed test results and verification.

### Production Deployment
See [DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md) for production deployment checklist.

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## Features

### Swarm Dashboard
- Real-time swarm connection monitoring
- Peer tracking and messaging
- Event logging system

### Pump.fun Integration
- Token data fetching and display
- Market cap tracking
- Raydium graduation monitoring
- Real-time data refresh
- SOL reserves display

### Wallet Integration
- Solana wallet connection (TODO: requires @solana/wallet-adapter)
- Transaction management
- Balance tracking

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)

## Raydium Graduation

When the token reaches ~$69,000 market cap on pump.fun:
1. Token automatically graduates to Raydium DEX
2. Liquidity migrates from pump.fun bonding curve to Raydium
3. Token becomes tradable on Raydium
4. Dashboard will reflect "GRADUATED TO RAYDIUM" status

Monitor graduation progress in the dashboard's PUMP_DATA panel.
