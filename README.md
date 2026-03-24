# The Batch Site

Updated Vite + React splash page for The Batch.

## What's new in v4

- Smarter store cards with city names
- Dedicated **Get Directions** button for every store
- Better mobile spacing so store content does not get crushed
- Smooth dropdown open/close easing for each strain card
- Soft hover lift + glassy blur treatment on store rows
- Pulsing glow on **IN STOCK** badges
- Batch Archive section
- English / Spanish toggle
- Custom glowing desktop cursor

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

```js
export const nextDropDate = "2026-04-03T18:00:00";
```

### Change the upcoming release

Edit `upcomingRelease` in `src/data.js`.

### Change previous batches and stores

Edit `previousBatches` in `src/data.js`.

Each store supports:

```js
{
  name: "Store Name",
  city: "Seattle, WA",
  status: "IN STOCK",
  mapsUrl: "https://maps.google.com/?q=Store+Name+Seattle+WA"
}
```

Use these exact status values:

- `IN STOCK`
- `SOLD OUT`

### Change the archive section

Edit `batchArchive` in `src/data.js`.

## Push changes to GitHub

From the project folder:

```bash
git add .
git commit -m "Describe your update"
git push
```

## Update Vercel

If GitHub is already connected to Vercel, every `git push` should trigger an automatic deploy.

If needed:
1. Open your project in Vercel
2. Go to **Deployments**
3. Click **Redeploy**

## Replace your existing local project with this version

1. Unzip this folder
2. Copy all files into your existing `the-batch-site` local folder
3. Replace old files when prompted
4. Run:

```bash
git add .
git commit -m "Add smarter store section, archive, and micro interactions"
git push
```
