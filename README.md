# The Batch Site v6

Updated Vite + React splash page for The Batch.

## What's new in v6

- Upcoming batch now supports multiple strains
- Upcoming release uses a dropdown list view so the page stays clean
- Each upcoming strain supports:
  - name
  - type
  - English description
  - Spanish description
- Cursor fix, archive dropdown, language toggle, smarter store section, and mobile polish are all still included

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

### Add multiple strains to the upcoming release

```js
export const upcomingRelease = {
  batch: "BATCH NO. 004",
  strains: [
    {
      name: "MIDNIGHT CITRUS",
      type: "HYBRID",
      notes: {
        en: "English description",
        es: "Spanish description"
      }
    },
    {
      name: "VELVET RUSH",
      type: "INDICA",
      notes: {
        en: "English description",
        es: "Spanish description"
      }
    }
  ]
};
```

### Change previous batches and stores

Edit `previousBatches` in `src/data.js`.

### Change the archive section

Edit `batchArchive` in `src/data.js`.

## Push changes to GitHub

From the project folder:

```bash
git add .
git commit -m "Describe your update"
git push
```

## Replace your existing local project with this version

1. Unzip this folder
2. Copy all files into your existing `the-batch-site` local folder
3. Replace old files when prompted
4. Run:

```bash
git add .
git commit -m "Add multi-strain upcoming batch support"
git push
```
