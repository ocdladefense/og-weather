import DayDetails from "./DayDetails";
import WeatherList from "./WeatherList";  
import ZipCodeForm from "./ZipCodeForm";
import {getState, renderComponent} from "./React";




  export default function Weather({ forecast, onSubmit, zipcode, cityName }) {


    let selectedDayIndex = getState("selectedDayIndex");
    // we should be able to acecess a new value for selectedDayIndex, if the value has changed.

    let container = document.createElement("div");

    let form = ZipCodeForm({onSubmit, zipcode});
    container.appendChild(form);

    let theList = WeatherList({forecast, rerender: () => {
      renderComponent(Weather, {forecast, onSubmit, zipcode, cityName});
    }});
    container.appendChild(theList);


    if (selectedDayIndex != null) {
      console.log("forecast sample:", forecast[0]);
      let details = DayDetails(forecast[selectedDayIndex], cityName);
      container.appendChild(details);
    }

    
    

    return container;
  }