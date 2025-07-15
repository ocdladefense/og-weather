const weatherUrl =
  "https://api.openweathermap.org/data/2.5/forecast?units=imperial&";
const apikey = "appid=f62d906d0cba21cc74c1fceb053bcb7e";

export default class Forecast {
  // gets forecast from lat/lng
  async load(lat, lng) {
    let response = await fetch(`${weatherUrl}lat=${lat}&lon=${lng}&${apikey}`);
    let data = await response.json();

    return {
      timezoneOffset: data.city.timezone,
      data: data.list,
    };
  }
}
