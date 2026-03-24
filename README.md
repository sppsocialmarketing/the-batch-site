# The Batch Site

Minimal Vite + React splash page for The Batch.

## What's updated

- Mobile-friendly store layout
- Expand/collapse strain dropdowns for previous batches
- Custom glowing white cursor on desktop / laptop
- Better spacing so stock badges do not crash into store names on small screens

## Run locally

```bash
npm install
npm run dev
```

## Build for production

```bash
npm run build
```

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

### Change previous batches, strains, stores, and statuses

Edit `previousBatches` in `src/data.js`.

Use these exact values for store status:

- `IN STOCK`
- `SOLD OUT`

Anything other than `IN STOCK` will show the red sold-out styling.

## Push changes to GitHub

From the project folder:

```bash
git add .
git commit -m "Update site"
git push
```

## Update Vercel

If your repo is already connected to Vercel, `git push` will usually trigger a new deployment automatically.

If you want to force a fresh deploy:

1. Open your project in Vercel
2. Go to the **Deployments** tab
3. Click the newest deployment or click **Redeploy**

## Replace your GitHub project with this updated version

If you already have the original site in GitHub:

1. Unzip this updated folder
2. Copy all files from this updated version into your existing local project folder
3. Replace the old files when prompted
4. Run:

```bash
git add .
git commit -m "Improve mobile layout and add dropdown stores"
git push
```

Vercel should update automatically after the push.


## English / Spanish Toggle
The top-right language toggle switches the interface between English and Spanish.
Strain names, batch numbers, and store data stay the same, while UI labels and stock badges translate automatically.
