const countryCodes = "FR,DE,ES,IT,BE,NL,CH,AT,PT,SE,NO,FI";

interface NominatimResponse {
  place_id: number;
  licence: string;
  osm_type: string;
  osm_id: number;
  lat: string;
  lon: string;
  class: string;
  type: string;
  place_rank: number;
  importance: number;
  addresstype: string;
  name: string;
  display_name: string;
  boundingbox: [string, string, string, string]; // Tableau de chaînes de caractères pour les coordonnées
}

export interface NominatimSuggestion {
  display_name: string;
  place_id: string;
  lat: string;
  lon: string;
}

export const getSuggestions = async (query: string) => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
        query
      )}&countrycodes=${countryCodes}&accept-language=fr&limit=4`
    );

    const data = await response.json();
    console.log(data);

    const filteredResults = data
      .filter(
        (item: NominatimResponse) =>
          item.addresstype &&
          (item.addresstype === "city" ||
            item.addresstype === "village" ||
            item.addresstype === "hamlet" ||
            item.addresstype === "place" ||
            item.addresstype === "tourism" ||
            item.addresstype === "park" ||
            item.addresstype === "road" ||
            item.addresstype === "shop" ||
            item.addresstype === "amenity" ||
            item.addresstype === "attraction" ||
            item.addresstype === "residential" ||
            item.addresstype === "biwak")
      )
      .map((item: NominatimSuggestion) => ({
        display_name: item.display_name,
        place_id: item.place_id,
        latitude: item.lat,
        longitude: item.lon,
      }));

    return filteredResults;
  } catch (error) {
    console.error("Erreur lors de la récupération des suggestions :", error);
    return [];
  }
};
