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


## What's new in v11

- Added optional **Use My Location** button in Store Finder
- Cities now sort nearest-first when location is enabled
- Stores inside each city also sort nearest-first
- Distance badges show miles away for cities and stores
- Added latitude/longitude fields in `src/data.js` for all sample stores

### Store coordinates format

```js
{
  name: "Store Name",
  status: "IN STOCK",
  mapsUrl: "https://maps.google.com/?q=Store+Name+City+State",
  lat: 47.6062,
  lng: -122.3321
}
```

### Push changes to GitHub

```bash
git add .
git commit -m "Add nearest store support"
git push
```
