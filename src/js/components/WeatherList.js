import WeatherListItem from "./WeatherListItem"
import DayDetails from "./DayDetails"

 // Render the entire weather list
 export default function WeatherList(forecastDays) {

    let onItemClick = (e) => {
      let selectedDay = forecastDays[e.currentTarget.dataset.index];
      DayDetails(selectedDay);
    };

    let listDiv = document.createElement("div");
    listDiv.classList.add("weather-list", "flex-parent");

    forecastDays.forEach((forecastDay, index) => {
        let item = WeatherListItem(forecastDay, onItemClick, index);

      listDiv.appendChild(item);
    });

    return listDiv;
  }