import WeatherDetails from "./WeatherDetails";
import CurrentWeather from "./CurrentWeather";
import Forecast from "./Forecast";  
import ZipCodeForm from "./ZipCodeForm";
import HourByHour from "./HourByHour";
import {getState, renderComponent} from "./React";




  export default function App({ forecast, currentWeather, units, onSubmit, zipcode, cityName }) {


    let selectedDayIndex = getState("selectedDayIndex");
    // we should be able to acecess a new value for selectedDayIndex, if the value has changed.

    let container = document.createElement("div");


    let form = ZipCodeForm({onSubmit, zipcode});
    container.appendChild(form);

    // Render the current weather
    let currentWeatherDiv = CurrentWeather(currentWeather); 
    container.appendChild(currentWeatherDiv);

     // Render the hour by hour forecast
    let hourByHourDiv = HourByHour(forecast[0]); 
    container.appendChild(hourByHourDiv);

    let theList = Forecast({forecast, units, rerender: () => {
      renderComponent(App, {forecast, currentWeather, units, onSubmit, zipcode, cityName});
    }});
    container.appendChild(theList);


    if (selectedDayIndex != null) {
      let details = WeatherDetails({day: forecast[selectedDayIndex], units, cityName});
      container.appendChild(details);
    }

    
    

    return container;
  }