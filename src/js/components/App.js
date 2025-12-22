import { getState, setState, useState } from "../utils/React";
import Geolocation from "../services/Geolocation";
import Forecast from "../services/Forecast";
import CurrentWeatherService from "../services/CurrentWeather";  
import WeatherDetails from "./WeatherDetails";
import CurrentWeather from "./CurrentWeather";
import ForecastComponent from "./Forecast";  
import ZipCodeForm from "./ZipCodeForm";
import HourByHour from "./HourByHour";
import fiveDayForecast from "../api/openweathermap/fiveDayForecast";






  export default function App() {


    let forecast = useState("forecast", []);
    let currentWeather = useState("currentWeather", null);
    let units = useState("units", "imperial");
    let zipcode = useState("zipcode", "");
    let cityName = useState("cityName", "");


    let onSubmit = async (e) => {
      e.preventDefault();
      // use e.target.zipcode.value to get the zipcode from the form.
      let zipcode = e.target.zipcode.value;
      setState("zipcode", zipcode);

      let geolocationService = new Geolocation();
      let forecastService = new Forecast();
      let currentWeatherService = new CurrentWeatherService();

      // let units = "imperial"; // or "metric", depending on your preference


      let { city, lat, lng } = await geolocationService.load(zipcode);
      setState("cityName", city);
      // lat = 22.27832;
      // lng = 114.17469;
      let { data, timezoneOffset } = await forecastService.load(lat,lng,units);
      

      // Get the current weather using the appropriate endpoint from the OpenWeatherMap API.
      let currentWeather  = await currentWeatherService.load(lat, lng);
      setState("currentWeather", currentWeather);
      // Assume the customer has chosen a 5-day forecast.
      // The product may have other options (10-day forecast, 30-day forecast, etc.).
      setState("forecast", fiveDayForecast(data, units, timezoneOffset));


      // this.render(ForecastComponent, currentWeather, units, zipcode, city);
    }; 

    if(getState("zipcode") !== zipcode) {
      setState("zipcode", zipcode);
    }



    let selectedDayIndex = getState("selectedDayIndex");
    // we should be able to acecess a new value for selectedDayIndex, if the value has changed.

    let container = document.createElement("div");


    let form = ZipCodeForm({onSubmit, zipcode});
    container.appendChild(form);

    // Render the current weather.
    let currentWeatherDiv = CurrentWeather({sample: currentWeather, units}); 
    container.appendChild(currentWeatherDiv);

     // Render the hour by hour forecast.
    let hourByHourDiv = HourByHour(forecast[0]); 
    container.appendChild(hourByHourDiv);

    let theList = ForecastComponent({forecast, units});
    container.appendChild(theList);


    if (selectedDayIndex != null) {
      let details = WeatherDetails({day: forecast[selectedDayIndex], units, cityName});
      container.appendChild(details);
    }

    
    

    return container;
  }