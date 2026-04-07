export const nextDropDate = "2026-04-10T18:00:00";

export const featuredRelease = {
  title: {
    en: "Limited Release",
    es: "Lanzamiento Limitado"
  },
  strain: "LEMON CHERRY GELATO",
  type: "HYBRID",
  details: {
    en: ["Indoor Flower", "Pesticide-Free", "Hand-Selected Flower"],
    es: ["Flor de Interior", "Libre de Pesticidas", "Flor Seleccionada a Mano"]
  },
  description: {
    en: "Clean indoor flower with a premium finish and a tightly controlled release.",
    es: "Flor indoor limpia con un acabado premium y un lanzamiento cuidadosamente controlado."
  }
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
