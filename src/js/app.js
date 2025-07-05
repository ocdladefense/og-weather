const regeneratorRuntime = require("regenerator-runtime");

// parseForecast is the ONLY export (default) from weatherParsing.js
import parseForecast from "./weatherParsing";
// getWeekday are methods from DateUtils.js
import AppView from "./components";

// sample openweathermap weather api call
//https://api.openweathermap.org/data/2.5/forecast?units=imperial&lat=43.9698&lon=-123.2006&appid=e366707bc2ea3e949fb1c0a16ce76d59
// sample openweathermap geolocation api call
// http://api.openweathermap.org/geo/1.0/zip?zip=97405,US&appid=e366707bc2ea3e949fb1c0a16ce76d59

// Two helper functions defined outside of the class.

// gets lat/lng from zip
async function zipcodeToLatLng(zipcode) {
  const response = await fetch(`${geoUrl}zip=${zipcode},US&${apikey}`);
  const data = await response.json();
  return {
    name: data.name,
    lat: data.lat,
    lng: data.lon,
  };
}

// gets forecast from lat/lng
async function latLngToForecast(lat, lng) {
  const respnse = await fetch(`${weatherUrl}lat=${lat}&lon=${lng}&${apikey}`);
  const data = await response.json();
  return {
    timezoneOffset: data.city.timezone,
    list: data.list,
  };
}

export default class App {
  constructor() {
    this.state = {
      timezoneOffset: 0,
      zipcode: "",
      forecast: [],
      selectedDate: null,
    };
    this.weatherUrl =
      "https://api.openweathermap.org/data/2.5/forecast?units=imperial&";
    this.geoUrl = "http://api.openweathermap.org/geo/1.0/zip?";
    this.apikey = "appid=f62d906d0cba21cc74c1fceb053bcb7e";

    // UI elements are now managed by AppView
  }

  // Gets called on the first render, and every time the user submits a new zipcode.
  render(forecast = [], cityName = "") {
    let onSubmit = async (e) => {
      e.preventDefault();
      // use e.target.zipcode.value to get the zipcode from the form.
      let zipcode = e.target.$zipcode.value;

      try {
        const city = await zipcodeToLatLng(zipcode, this.geoUrl, this.apikey);
        const weather = await latLngToForecast(
          city.lat,
          city.lng,
          this.weatherUrl,
          this.apikey
        );

        forecast = parseForecast(weather.list, weather.timezoneOffset);

        AppView.renderWeatherList(forecast);
        AppView.clearCurrentDay();
        // Clear the zipcode from the UI

        AppView.$zipcode.value = "";
      } catch (err) {
        alert("There was a problem getting location information!");
      }
    };

    // The forecast does render the first time, only with an empty array :-)
    AppView.render({ forecast, onSubmit });
  }

  // IMPORTANT!! this goes away.
  // gets replaced by two distinct functions one for each fetch.
  // Also; no need to ever use 'this' in either function, functions take whatever data they need as parameters.
  // place these functions outside of this class, put the pieces together above in onSubmit, line 38 (inside of render()).
}
