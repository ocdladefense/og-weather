const regeneratorRuntime = require("regenerator-runtime");

// parseForecast is the ONLY export (default) from weatherParsing.js
import parseForecast from "./api/weatherParsing";
import App from "./components/App";
import CurrentWeather from "./services/CurrentWeather";
import Forecast from "./services/Forecast";
import Geolocation from "./services/Geolocation";
import {renderComponent, getState, setState} from "./components/React";

// sample openweathermap weather api call
//https://api.openweathermap.org/data/2.5/forecast?units=imperial&lat=43.9698&lon=-123.2006&appid=e366707bc2ea3e949fb1c0a16ce76d59
// sample openweathermap geolocation api call
// http://api.openweathermap.org/geo/1.0/zip?zip=97405,US&appid=e366707bc2ea3e949fb1c0a16ce76d59

export default class Controller {

  
  constructor() {
    this.state = {
      timezoneOffset: 0,
      zipcode: "",
      forecast: [],
      selectedDate: null,
    };

  }

  // Gets called on the first render, and every time the user submits a new zipcode.
  render(forecast = [], zipcode = "", cityName = "") {
    let onSubmit = async (e) => {
      e.preventDefault();
      // use e.target.zipcode.value to get the zipcode from the form.
      let zipcode = e.target.zipcode.value;

      let forecastService = new Forecast();
      let geolocationService = new Geolocation();
      let currentWeatherService = new CurrentWeather();
      let units = "imperial"; // or "metric", depending on your preference
      let { city, lat, lng } = await geolocationService.load(zipcode);
      let { data, timezoneOffset } = await forecastService.load(lat,lng,units);
      // Get the current weather using the appropriate endpoint from the OpenWeatherMap API.
      // let {foo,bar} = await currentWeatherService.load(lat, lng, units);

      let forecast = parseForecast(data, timezoneOffset);

      this.render(forecast, zipcode, city);
    };

    // The forecast does render the first time, only with an empty array :-)

    // Set the first selected day only once forecast is available
    if (forecast.length > 0 && getState("selectedDayIndex") == null) {
      setState("selectedDayIndex", 0);
    }

    if(getState("zipcode") !== zipcode) {
      setState("zipcode", zipcode);
    }


    renderComponent(App, {forecast, zipcode, cityName, onSubmit});
  }

}
