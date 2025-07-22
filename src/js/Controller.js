
import fiveDayForecast from "./api/openweathermap/fiveDayForecast";
// import currentWeather from "./api/openweathermap/currentWeather";

import App from "./components/App";
import Geolocation from "./services/Geolocation";
import Forecast from "./services/Forecast";
// import CurrentWeatherService from "./services/CurrentWeather";

import {renderComponent, getState, setState} from "./components/React";




export default class Controller {

  
  constructor() {
    this.state = {
      timezoneOffset: 0,
      zipcode: "",
      forecast: [],
      currentWeather: null,
      selectedDate: null,
    };

  }

  // Gets called on the first render, and every time the user submits a new zipcode.
  render(forecast = [], currentWeather = null, units, zipcode = "", cityName = "") {
    let onSubmit = async (e) => {
      e.preventDefault();
      // use e.target.zipcode.value to get the zipcode from the form.
      let zipcode = e.target.zipcode.value;

      let geolocationService = new Geolocation();
      let forecastService = new Forecast();
      
      // let currentWeatherService = new CurrentWeatherService();
      let units = "imperial"; // or "metric", depending on your preference


      let { city, lat, lng } = await geolocationService.load(zipcode);
      let { data, timezoneOffset } = await forecastService.load(lat,lng,units);
      // Get the current weather using the appropriate endpoint from the OpenWeatherMap API.
      //{lat, lng} = await currentWeatherService.load(lat, lng, units);

      // Assume the customer has chosen a 5-day forecast.
      // The product may have other options (10-day forecast, 30-day forecast, etc.).

      let forecast = fiveDayForecast(data, timezoneOffset);
      //let weather = currentWeather(data);

      this.render(forecast, null, units, zipcode, city);
    }; 

    if(getState("zipcode") !== zipcode) {
      setState("zipcode", zipcode);
    }


    renderComponent(App, {forecast, currentWeather, units, zipcode, cityName, onSubmit});
  }

}
