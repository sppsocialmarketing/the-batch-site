export const nextDropDate = "2026-04-10T18:00:00";

export const featuredRelease = {
  label: "LIMITED RELEASE",
  strain: "LEMON CHERRY GELATO",
  notes: {
    en: "Indoor flower. Pesticide-free. Hand-selected for a limited release.",
    es: "Flor indoor. Libre de pesticidas. Seleccionada a mano para un lanzamiento limitado."
  },
  highlights: {
    en: ["Indoor Flower", "Pesticide-Free", "Hand-Selected"],
    es: ["Flor Indoor", "Libre de Pesticidas", "Selección a Mano"]
  }
};

export const nextRelease = {
  title: {
    en: "What’s Coming in the Next Drop",
    es: "Lo Que Viene en el Próximo Drop"
  },
  subtitle: {
    en: "These strains release when the countdown hits zero.",
    es: "Estos strains se liberan cuando el contador llegue a cero."
  },
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
      name: "EYE CANDY",
      type: "HYBRID",
      notes: {
        en: "Sweet, standout flower with a polished candy-forward profile.",
        es: "Flor llamativa con un perfil dulce y marcado tipo caramelo."
      }
    },
    {
      name: "OREOZ",
      type: "INDICA",
      notes: {
        en: "Creamy, dessert-like profile with deep relaxing effects.",
        es: "Perfil cremoso tipo postre con efectos relajantes profundos."
      }
    }
  ]
};

export const storeReleases = [
  {
    strain: "LEMON CHERRY GELATO",
    type: "HYBRID",
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
            lat: 48.054,
            lng: -122.183
          }
        ]
      },
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
  }
];
