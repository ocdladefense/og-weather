import WeatherListItem from "./WeatherListItem"
import DayDetails from "./DayDetails"

 // Render the entire weather list
 export default function WeatherList(forecastDays) {
    // const itemsHTML = forecastDays
    //   .map((forecastDay, index) =>
    //     WeatherListItem(forecastDay, index)
    //   )
    //   .join("");

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
    // Add click event handlers to each weather list item
    // const forecastElements =
    //   this.listDiv.querySelectorAll(".weather-list-item");
    // forecastElements.forEach((element) => {
    //   element.addEventListener("click", (event) => {
    //     const index = parseInt(element.dataset.index, 10); // Parse data-index attribute
    //     if (typeof onItemClick === "function") {
    //       onItemClick(index); // Execute the callback with the index
    //     }
    //   });
    // });

    return listDiv;
  }