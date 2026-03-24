# The Batch Site v5

Updated Vite + React splash page for The Batch.

## What's new in v5

- Fixed custom cursor jitter using Framer Motion motion values instead of React state updates
- Archive section moved to the bottom of the page on mobile and desktop
- Archive is now a dropdown for long-term scalability
- New archive description copy
- Upcoming release description now switches properly between English and Spanish
- Smarter store cards, mobile polish, dropdown strain cards, city names, directions buttons, stock glow pulse, and language toggle all still included

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

The description now supports both languages:

```js
notes: {
  en: "English description",
  es: "Spanish description"
}
```

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
git commit -m "Fix cursor and update archive layout"
git push
```
