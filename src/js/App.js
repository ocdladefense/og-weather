const regeneratorRuntime = require("regenerator-runtime");

// parseForecast is the ONLY export (default) from weatherParsing.js
import parseForecast from "./weatherParsing";

import ClearDayDetails from "./components/ClearDayDetails";
import RenderList from "./components/RenderList";

import Forecast from "./services/Forecast";
import Geolocation from "./services/Geolocation";

// sample openweathermap weather api call
//https://api.openweathermap.org/data/2.5/forecast?units=imperial&lat=43.9698&lon=-123.2006&appid=e366707bc2ea3e949fb1c0a16ce76d59
// sample openweathermap geolocation api call
// http://api.openweathermap.org/geo/1.0/zip?zip=97405,US&appid=e366707bc2ea3e949fb1c0a16ce76d59

export default class App {

  
  constructor() {
    this.state = {
      timezoneOffset: 0,
      zipcode: "",
      forecast: [],
      selectedDate: null,
    };

  }

  // Gets called on the first render, and every time the user submits a new zipcode.
  render(forecast = [], cityName = "") {
    let onSubmit = async (e) => {
      e.preventDefault();
      // use e.target.zipcode.value to get the zipcode from the form.
      let zipcode = e.target.zipcode.value;

      let forecastService = new Forecast();
      let geolocationService = new Geolocation();

      let { city, lat, lng } = await geolocationService.zipcodeToLatLng(
        zipcode
      );
      let { data, timezoneOffset } = await forecastService.getForecast(
        lat,
        lng
      );

      let forecast = parseForecast(data, timezoneOffset);

      this.render(forecast);
      ClearDayDetails();
  };

    // The forecast does render the first time, only with an empty array :-)
    let parent = RenderList({ forecast, onSubmit });

    let app = document.getElementById("app");

    // Clear existing forecast list, without this it was increasing exponentialy
    app.innerHTML = "";
    app.appendChild(parent);
  }
}
