export const nextDropDate = "2026-04-03T18:00:00";

export const upcomingRelease = {
  batch: "BATCH NO. 004",
  strains: [
    {
      name: "Gas Nana",
      type: "HYBRID",
      notes: {
        en: "Bright citrus on the front, deeper gas on the finish. Tight drop. No reruns.",
        es: "Cítrico brillante al inicio, con un final más profundo y gaseoso. Drop cerrado. Sin repeticiones."
      }
    },
    {
      name: "Hi Chew",
      type: "INDICA",
      notes: {
        en: "Dense flower with a darker finish and slow body melt.",
        es: "Flor densa con un final más oscuro y un efecto corporal lento."
      }
    },
    {
      name: "Candy Gas",
      type: "SATIVA",
      notes: {
        en: "Sharper citrus with a brighter, more lifted feel.",
        es: "Cítrico más intenso con una sensación más brillante y elevada."
      }
    }
    {
      name: "Lemon Cherry Gelato",
      type: "SATIVA",
      notes: {
        en: "Sharper citrus with a brighter, more lifted feel.",
        es: "Cítrico más intenso con una sensación más brillante y elevada."
      }
    }
  ]
};

export const previousBatches = [
  {
    batch: "BATCH NO. 003",
    strain: "LEMON STATIC",
    type: "SATIVA",
    stores: [
      {
        name: "Greenhouse Dispensary",
        city: "Seattle, WA",
        status: "IN STOCK",
        mapsUrl: "https://maps.google.com/?q=Greenhouse+Dispensary+Seattle+WA"
      },
      {
        name: "Urban Harvest",
        city: "Bellevue, WA",
        status: "SOLD OUT",
        mapsUrl: "https://maps.google.com/?q=Urban+Harvest+Bellevue+WA"
      }
    ]
  },
  {
    batch: "BATCH NO. 002",
    strain: "JET FUEL OG",
    type: "SATIVA",
    stores: [
      {
        name: "Elevate Cannabis",
        city: "Tacoma, WA",
        status: "IN STOCK",
        mapsUrl: "https://maps.google.com/?q=Elevate+Cannabis+Tacoma+WA"
      },
      {
        name: "Cloud 9 Collective",
        city: "Everett, WA",
        status: "SOLD OUT",
        mapsUrl: "https://maps.google.com/?q=Cloud+9+Collective+Everett+WA"
      }
    ]
  },
  {
    batch: "BATCH NO. 001",
    strain: "VELVET GAS",
    type: "INDICA",
    stores: [
      {
        name: "Northline Cannabis",
        city: "Marysville, WA",
        status: "IN STOCK",
        mapsUrl: "https://maps.google.com/?q=Northline+Cannabis+Marysville+WA"
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
