const weatherUrl =
  "https://api.openweathermap.org/data/2.5/forecast?units=imperial&";
const apikey = "appid=f62d906d0cba21cc74c1fceb053bcb7e";


// Sample openweathermap weather api call
// https://api.openweathermap.org/data/2.5/forecast?units=imperial&lat=43.9698&lon=-123.2006&appid=e366707bc2ea3e949fb1c0a16ce76d59
export default class Forecast {
  // gets forecast from lat/lng
  async load(lat, lng) {
    let response = await fetch(`${weatherUrl}lat=${lat}&lon=${lng}&${apikey}`);
    let data = await response.json();

    return {
      data: data.list,
      timezoneOffset: data.city.timezone,
    };
  }
}
