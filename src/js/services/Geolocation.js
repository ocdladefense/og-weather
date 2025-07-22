const geoUrl = "http://api.openweathermap.org/geo/1.0/zip?";
const apikey = "appid=f62d906d0cba21cc74c1fceb053bcb7e";

// Sample openweathermap geolocation api call
// http://api.openweathermap.org/geo/1.0/zip?zip=97405,US&appid=e366707bc2ea3e949fb1c0a16ce76d59

export default class Geolocation {
  // gets lat/lng from zip
  async load(zipcode) {
    let response = await fetch(`${geoUrl}zip=${zipcode},US&${apikey}`);
    let data = await response.json();

    return {
      city: data.name,
      lat: data.lat,
      lng: data.lon,
    };
  }
}
