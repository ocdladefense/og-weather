import Sample from "../models/Sample";

const weatherUrl = "https://api.openweathermap.org/data/2.5/weather?units=imperial&";
const apikey = "appid=f62d906d0cba21cc74c1fceb053bcb7e";

export default class CurrentWeatherService {
  // gets forecast from lat/lng
  async load(lat, lng) {
    let response = await fetch(`${weatherUrl}lat=${lat}&lon=${lng}&${apikey}`);
    let data = await response.json();

    //return data; 
    return new Sample(data); // Wrap raw weather in Sample
    
    //{   timezoneOffset: data.city.timezone,
    //   data: data.main,
    //};
  }
}
