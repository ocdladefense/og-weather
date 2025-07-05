const geoUrl = "http://api.openweathermap.org/geo/1.0/zip?";
const apikey = "appid=f62d906d0cba21cc74c1fceb053bcb7e";

export default class Geolocation {
  // gets lat/lng from zip
  async zipcodeToLatLng(zipcode) {
    let response = await fetch(`${geoUrl}zip=${zipcode},US&${apikey}`);
    let data = await response.json();

    return {
      city: data.name,
      lat: data.lat,
      lng: data.lon,
    };
  }
}
