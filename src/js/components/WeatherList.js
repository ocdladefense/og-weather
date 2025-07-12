import WeatherListItem from "./WeatherListItem"
import {setState} from "./React";

 // Render the entire weather list
 export default function WeatherList({forecast, rerender}) {

    let onItemClick = (e) => {
      let selectedDayIndex = e.currentTarget.dataset.index;
      setState("selectedDayIndex", selectedDayIndex);
      rerender();
    };

    let listDiv = document.createElement("div");
    listDiv.classList.add("weather-list", "flex-parent");

    forecast.forEach((day, index) => {
        let item = WeatherListItem(day, onItemClick, index);

      listDiv.appendChild(item);
    });

    return listDiv;
  }