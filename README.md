# The Batch Site v8

Updated Vite + React splash page for The Batch.

## What's new in v8

- Store Finder is now two-level:
  - click a strain
  - then click a city
  - then see only stores in that city
- Much better for mobile and faster to scan nearby locations
- Updated helper copy for the Store Finder section
- Multi-strain upcoming batch support is still included
- Cursor fix, archive dropdown, language toggle, and store status glow are still included

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

### Store format

```js
storesByCity: [
  {
    city: "Seattle, WA",
    stores: [
      {
        name: "Greenhouse Dispensary",
        status: "IN STOCK",
        mapsUrl: "https://maps.google.com/?q=Greenhouse+Dispensary+Seattle+WA"
      }
    ]
  }
]
```

## Push changes to GitHub

```bash
git add .
git commit -m "Make city list collapsible in store finder"
git push
```


## What's new in v9

- Fixed city badge layout so `2 STORES` and `1 IN STOCK` no longer stack awkwardly
- Better city row spacing and mobile badge layout


## What's new in v10

- Fixed desktop `Get Directions` button so it stays on one line
- Tightened animation timing for a cleaner, more premium feel


## What's new in v13

- Fixed the actual black-screen bug from v11/v12
- Restored the missing helper function that caused runtime failure
- Kept nearest-location support and safer data handling


## What's new in v14

- Improved mobile geolocation with a fallback request if high-accuracy lookup fails
- Fixed city-row badges so `1 stores`, `1 IN STOCK`, and miles-away tags wrap cleanly under the city name
- Chevron now stays isolated on the right so the metadata does not get shoved around


## What's new in v15

- When the countdown hits zero, the timer switches to:
  - `CURRENTLY LANDING IN STORES...`
- Added subtle animated dots for the in-process state
- Helps the countdown feel intentional instead of just stopping at zero
