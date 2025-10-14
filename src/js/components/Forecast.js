import ForecastItem from "./ForecastItem"
import {setState} from "./React";

 // Render the entire weather list
 export default function Forecast({forecast, units, rerender}) {

    let onItemClick = (e) => {
      let selectedDayIndex = e.currentTarget.dataset.index;
      setState("selectedDayIndex", selectedDayIndex);
      rerender();
    };

    let listDiv = document.createElement("div");
    listDiv.classList.add("weather-list", "flex-parent");

    forecast.forEach((f, index) => {
      let item = ForecastItem(f, units, onItemClick, index);

      listDiv.appendChild(item);
    });

    return listDiv;
  }