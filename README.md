# Stock price explorer
React/Vite frontend for the [FastAPI backend](https://github.com/iamsaiteja/stock-market-analysis-api). Shows provider price, daily change, volume and market cap. Data may be delayed; this is not a streaming exchange feed.

## Run locally (Node.js 22+)
```sh
git clone https://github.com/iamsaiteja/stock-market-frontend.git
cd stock-market-frontend
npm ci
cp .env.example .env.local
npm run dev
```
On Windows copy `.env.example` to `.env.local` with your file manager. Set VITE_API_URL to your backend base URL without a trailing slash. Vite runs at http://localhost:5173.

The backend is a separate repository: clone it, install its requirements and run `uvicorn app.main:app --reload` from its root. This frontend has no backend/ or frontend/ subdirectory.

## Checks
`npm run lint` and `npm run build`. Manually check blank input, invalid symbol, unavailable backend and a valid response. Requests have a 20-second timeout; the button is disabled while loading and stale results are cleared.

## Deployment
Set VITE_API_URL in Vercel before building. Existing demo: https://stock-market-frontend-nine.vercel.app (availability is not checked by unit/build tests).
