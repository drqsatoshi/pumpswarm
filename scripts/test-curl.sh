#!/bin/bash

# Test script for pump.fun API using curl
# This script tests data fetching for the $NPM token

TOKEN_ADDRESS="EkMNiWoasYkSTXj5k4rMZhjoYRmuh4V1i1KbkJ5Ppump"
PUMP_API_BASE="https://frontend-api.pump.fun"

echo "═══════════════════════════════════════════════════════"
echo "  PUMPSWARM CURL TEST - Data Fetch & Refresh"
echo "═══════════════════════════════════════════════════════"
echo ""

echo "🔍 Testing pump.fun API endpoints with curl..."
echo "Token Address: $TOKEN_ADDRESS"
echo ""

# Test different potential API endpoints
endpoints=(
  "/coins/$TOKEN_ADDRESS"
  "/token/$TOKEN_ADDRESS"
  "/api/coins/$TOKEN_ADDRESS"
  "/api/token/$TOKEN_ADDRESS"
)

success=0

for endpoint in "${endpoints[@]}"; do
  url="${PUMP_API_BASE}${endpoint}"
  echo "📡 Testing: $url"
  
  response=$(curl -s -w "\n%{http_code}" "$url" 2>&1)
  http_code=$(echo "$response" | tail -n1)
  body=$(echo "$response" | sed '$d')
  
  echo "   HTTP Status: $http_code"
  
  if [ "$http_code" = "200" ]; then
    echo "   ✅ Success! Response:"
    echo "$body" | jq '.' 2>/dev/null || echo "$body"
    success=1
    echo ""
    break
  elif [ "$http_code" = "404" ]; then
    echo "   ❌ Not Found"
  else
    echo "   ⚠️  Status: $http_code"
  fi
  echo ""
done

if [ $success -eq 0 ]; then
  echo "⚠️  No successful API responses from standard endpoints"
  echo ""
  echo "💡 Possible reasons:"
  echo "   - Token may have graduated to Raydium"
  echo "   - API endpoint structure may have changed"
  echo "   - Token data may be on a different service"
  echo ""
fi

# Test basic connectivity
echo "🌐 Testing pump.fun website connectivity..."
http_code=$(curl -s -o /dev/null -w "%{http_code}" "https://pump.fun" 2>&1)
if [ "$http_code" = "200" ] || [ "$http_code" = "301" ] || [ "$http_code" = "302" ]; then
  echo "   ✅ Website accessible (Status: $http_code)"
else
  echo "   ❌ Website not accessible (Status: $http_code)"
fi
echo ""

# Test the specific token page
echo "🔗 Testing token page..."
token_url="https://pump.fun/coin/$TOKEN_ADDRESS"
http_code=$(curl -s -o /dev/null -w "%{http_code}" "$token_url" 2>&1)
echo "   URL: $token_url"
echo "   Status: $http_code"
if [ "$http_code" = "200" ]; then
  echo "   ✅ Token page exists"
elif [ "$http_code" = "404" ]; then
  echo "   ⚠️  Token page not found (may have graduated)"
else
  echo "   ⚠️  Unexpected status"
fi
echo ""

echo "═══════════════════════════════════════════════════════"
echo "  TEST COMPLETE"
echo "═══════════════════════════════════════════════════════"

exit 0
