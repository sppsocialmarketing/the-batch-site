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


## What's new in v16

- Fixed the black-screen bug from the countdown-zero update
- Added the `CURRENTLY LANDING IN STORES...` state correctly this time
- Includes localized subtext and animated dots


## What's new in v17

- Swapped the site to a soft light theme
- Inverted the visual system to match white-label / black-text branding
- Uses an off-white background instead of pure white, so it feels premium and is less harsh in dark rooms
- No dark/light toggle included


## What's new in v18

- Fixed the custom cursor so it tracks directly with the mouse instead of lagging behind
- Reduced cursor size and glow slightly to cut down on motion sickness
- Kept the same visual style without the floaty trailing effect


## What's new in v19

- Reworked `IN STOCK` and `SOLD OUT` badge colors for the light theme
- Higher contrast and cleaner premium styling
- Reduced neon/glow effect so statuses feel more refined on the soft background
