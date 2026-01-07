# Pump.fun Swarm Testing

This document explains how to use the swarm testing functionality for the pump.fun environment.

## Overview

The pumpswarm application now includes comprehensive pump.fun API integration that:
- Fetches real-time token data from pump.fun
- Monitors Raydium graduation status
- Provides auto-refreshing data display
- Tests swarm connectivity

## Features Added

### 1. Pump.fun API Service (`src/lib/pumpFunApi.ts`)
- Fetches token data from pump.fun API
- Checks Raydium graduation status
- Calculates bonding curve progress
- Provides periodic data refresh functionality

### 2. React Hook (`src/hooks/usePumpFunData.ts`)
- React hook for easy integration of pump.fun data
- Auto-refresh capability (default: 30 seconds)
- Error handling and loading states
- Event bus integration for notifications

### 3. Dashboard Component (`src/components/containers/PumpFunStatusContainer.tsx`)
- Live pump.fun status display
- Raydium graduation monitoring
- Market cap and token statistics
- Direct links to pump.fun and Raydium
- Manual refresh capability

### 4. Test Script (`test-swarm.js`)
- Command-line test suite for swarm functionality
- Tests API connectivity
- Verifies Raydium graduation status
- Simulates swarm connections
- Tests data refresh functionality

## Usage

### Running the Test Script

```bash
npm run test:swarm
```

This will:
1. Test connection to pump.fun API
2. Fetch current token data
3. Check Raydium graduation status
4. Calculate bonding curve progress
5. Simulate swarm peer connections
6. Perform multiple data refreshes

### Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Run linter
npm run lint
```

### Viewing the Dashboard

1. Start the development server: `npm run dev`
2. Navigate to `/dashboard` route
3. View the "Pump.fun Status" card for live token data

## API Integration

The application fetches data from:
```
https://frontend-api.pump.fun/coins/{CONTRACT_ADDRESS}
```

Contract Address: `EkMNiWoasYkSTXj5k4rMZhjoYRmuh4V1i1KbkJ5Ppump`

## Raydium Graduation

The system automatically monitors for Raydium graduation by checking:
- `complete` flag is `true`
- `raydium_pool` address is present

When graduated, the UI will:
- Display a "Graduated" badge
- Show the Raydium pool address
- Provide direct link to trade on Raydium
- Send success notification

## Auto-Refresh

The dashboard automatically refreshes data every 30 seconds. You can also manually refresh by clicking the refresh button in the Pump.fun Status card.

## Testing Checklist

- [x] API connection to pump.fun
- [x] Token data fetching
- [x] Raydium graduation detection
- [x] Bonding curve progress calculation
- [x] Auto-refresh functionality
- [x] Error handling
- [x] UI display on dashboard
- [x] Build process
- [x] npm test script

## Production Deployment

Once all tests pass:

1. Ensure `npm run test:swarm` succeeds
2. Verify `npm run build` completes without errors
3. Test the dashboard manually
4. Deploy the built application from the `dist/` folder

## Troubleshooting

### Test Script Fails
If the test script fails with network errors, check:
- Internet connectivity
- pump.fun API availability
- Node.js version (should support fetch API or have it polyfilled)

### Build Issues
If the build fails:
- Run `npm install` to ensure dependencies are installed
- Check for TypeScript errors
- Ensure all imports are correct

### Dashboard Not Showing Data
If the dashboard doesn't show pump.fun data:
- Check browser console for errors
- Verify network tab shows successful API calls
- Check if CORS is blocking requests (shouldn't be in production)
