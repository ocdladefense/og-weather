import Sample from "../models/Sample";

const weatherUrl = "https://api.openweathermap.org/data/2.5/weather?units=imperial&";
const apikey = "appid=f62d906d0cba21cc74c1fceb053bcb7e";

export default class CurrentWeatherService {
  // gets forecast from lat/lng
  async load(lat, lng) {
    let response = await fetch(`${weatherUrl}lat=${lat}&lon=${lng}&${apikey}`);
    let data = await response.json();
 
    
    // Wrap raw weather data in Sample
    // Be sure to call fromOpenWeatherMap to populate the data.
    return Sample.fromOpenWeatherMap(data, "imperial");

  }
}
