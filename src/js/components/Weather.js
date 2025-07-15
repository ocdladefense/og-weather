import DayDetails from "./DayDetails";
import WeatherList from "./WeatherList";  
import ZipCodeForm from "./ZipCodeForm";
import {getState, renderComponent} from "./React";




  export default function Weather({ forecast, onSubmit }) {


    let selectedDayIndex = getState("selectedDayIndex") || null;
    // we should be able to acecess a new value for selectedDayIndex, if the value has changed.

    let form = ZipCodeForm({onSubmit});

    let container = document.createElement("div");
    let theList = WeatherList({forecast, rerender: () => {
      renderComponent(Weather, {forecast, onSubmit});
    }});
    container.appendChild(theList);


    if (selectedDayIndex != null) {
      let details = DayDetails(forecast[selectedDayIndex]);
      container.appendChild(details);
    }

    
    

    return container;
  }