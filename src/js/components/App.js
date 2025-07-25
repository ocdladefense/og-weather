import WeatherDetails from "./WeatherDetails";
import Forecast from "./Forecast";  
import ZipCodeForm from "./ZipCodeForm";
import {getState, renderComponent} from "./React";




  export default function App({ forecast, units, onSubmit, zipcode, cityName }) {


    let selectedDayIndex = getState("selectedDayIndex");
    // we should be able to acecess a new value for selectedDayIndex, if the value has changed.

    let container = document.createElement("div");

    //let currentWeatherDiv = CurrentWeather(currentWeather); 
    //container.appendChild(currentWeatherDiv);

    let form = ZipCodeForm({onSubmit, zipcode});
    container.appendChild(form);

    // Render the current weather


    let theList = Forecast({forecast, units, rerender: () => {
      renderComponent(App, {forecast, onSubmit, zipcode, cityName});
    }});
    container.appendChild(theList);


    if (selectedDayIndex != null) {
      let details = WeatherDetails({day: forecast[selectedDayIndex], units, cityName});
      container.appendChild(details);
    }

    
    

    return container;
  }