# The Batch Site

Minimal Vite + React splash page for The Batch.

## Run locally

```bash
npm install
npm run dev
```

## Build for production

```bash
npm run build
```

## Deploy to Vercel

1. Upload this folder to a GitHub repository.
2. Import the repo into Vercel.
3. Vercel should detect Vite automatically.
4. Deploy.

## Edit your content

Open `src/data.js`.

### Change the countdown
Edit:

```js
export const nextDropDate = "2026-04-03T18:00:00";
```

Format:

```txt
YYYY-MM-DDTHH:MM:SS
```

### Change the upcoming release
Edit `upcomingRelease` in `src/data.js`.

### Change previous batches and store statuses
Edit `previousBatches` in `src/data.js`.

Use these exact values for store status:

- `IN STOCK`
- `SOLD OUT`

Anything other than `IN STOCK` will show the red sold-out styling.
