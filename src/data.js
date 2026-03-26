export const nextDropDate = "2026-04-03T18:00:00";

export const upcomingRelease = {
  batch: "BATCH NO. 001",
  strains: [
    {
      name: "GAS NANA",
      type: "HYBRID",
      notes: {
        en: "Heavy gas layered with sweet banana undertones.",
        es: "Gas intenso con notas dulces de plátano."
      }
    },
    {
      name: "HI CHEW",
      type: "SATIVA",
      notes: {
        en: "Bright, candy-like profile with a smooth, uplifting finish.",
        es: "Perfil dulce tipo caramelo con un efecto ligero y energético."
      }
    },
    {
      name: "CANDY GAS",
      type: "HYBRID",
      notes: {
        en: "Sweet candy inhale with a strong gassy backend.",
        es: "Entrada dulce tipo caramelo con un final fuerte y gaseoso."
      }
    },
    {
      name: "CANDY CARTEL",
      type: "INDICA",
      notes: {
        en: "Rich, sugary aroma with a heavier body effect.",
        es: "Aroma dulce intenso con un efecto corporal más pesado."
      }
    },
    {
      name: "OREOZ",
      type: "INDICA",
      notes: {
        en: "Creamy, dessert-like profile with deep relaxing effects.",
        es: "Perfil cremoso tipo postre con efectos relajantes profundos."
      }
    },
    {
      name: "EYE CANDY",
      type: "HYBRID",
      notes: {
        en: "Visually striking flower with a smooth, balanced high.",
        es: "Flor visualmente llamativa con un efecto equilibrado y suave."
      }
    },
    {
      name: "LEMON CHERRY GELATO",
      type: "HYBRID",
      notes: {
        en: "Citrus and cherry sweetness with a creamy gelato finish.",
        es: "Cítrico y cereza con un final cremoso tipo gelato."
      }
    }
  ]
};

export const previousBatches = [
  {
    batch: "BATCH NO. 003",
    strain: "LEMON STATIC",
    type: "SATIVA",
    storesByCity: [
      {
        city: "Seattle, WA",
        stores: [
          {
            name: "Greenhouse Dispensary",
            status: "IN STOCK",
            mapsUrl: "https://maps.google.com/?q=Greenhouse+Dispensary+Seattle+WA",
            lat: 47.6062,
            lng: -122.3321
          },
          {
            name: "North Dock Cannabis",
            status: "SOLD OUT",
            mapsUrl: "https://maps.google.com/?q=North+Dock+Cannabis+Seattle+WA",
            lat: 47.6145,
            lng: -122.3418
          }
        ]
      },
      {
        city: "Bellevue, WA",
        stores: [
          {
            name: "Urban Harvest",
            status: "SOLD OUT",
            mapsUrl: "https://maps.google.com/?q=Urban+Harvest+Bellevue+WA",
            lat: 47.6101,
            lng: -122.2015
          }
        ]
      }
    ]
  },
  {
    batch: "BATCH NO. 002",
    strain: "JET FUEL OG",
    type: "SATIVA",
    storesByCity: [
      {
        city: "Tacoma, WA",
        stores: [
          {
            name: "Elevate Cannabis",
            status: "IN STOCK",
            mapsUrl: "https://maps.google.com/?q=Elevate+Cannabis+Tacoma+WA",
            lat: 47.2529,
            lng: -122.4443
          }
        ]
      },
      {
        city: "Everett, WA",
        stores: [
          {
            name: "Cloud 9 Collective",
            status: "SOLD OUT",
            mapsUrl: "https://maps.google.com/?q=Cloud+9+Collective+Everett+WA",
            lat: 47.9789,
            lng: -122.2021
          }
        ]
      }
    ]
  },
  {
    batch: "BATCH NO. 001",
    strain: "VELVET GAS",
    type: "INDICA",
    storesByCity: [
      {
        city: "Marysville, WA",
        stores: [
          {
            name: "Northline Cannabis",
            status: "IN STOCK",
            mapsUrl: "https://maps.google.com/?q=Northline+Cannabis+Marysville+WA",
            lat: 48.0518,
            lng: -122.1771
          },
          {
            name: "Cascade Green",
            status: "IN STOCK",
            mapsUrl: "https://maps.google.com/?q=Cascade+Green+Marysville+WA",
            lat: 48.0540,
            lng: -122.1830
          }
        ]
      }
    ]
  }
];

export const batchArchive = [
  {
    batch: "BATCH NO. 003",
    strain: "LEMON STATIC",
    type: "SATIVA",
    status: "Released"
  },
  {
    batch: "BATCH NO. 002",
    strain: "JET FUEL OG",
    type: "SATIVA",
    status: "Archived"
  },
  {
    batch: "BATCH NO. 001",
    strain: "VELVET GAS",
    type: "INDICA",
    status: "Archived"
  }
];
