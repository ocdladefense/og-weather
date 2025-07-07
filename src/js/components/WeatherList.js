import WeatherListItem from "./WeatherListItem"
import DayDetails from "./DayDetails"

 // Render the entire weather list
 export default function WeatherList(forecastDays) {
    const itemsHTML = forecastDays
      .map((forecastDay, index) =>
        WeatherListItem(forecastDay, index)
      )
      .join("");

    let onItemClick = (index) => {
      const selectedDay = forecastDays[index];
      DayDetails(selectedDay);
    };

    this.$weatherList.innerHTML = `<div class="weather-list flex-parent">${itemsHTML}</div>`;

    // Add click event handlers to each weather list item
    const forecastElements =
      this.$weatherList.querySelectorAll(".weather-list-item");
    forecastElements.forEach((element) => {
      element.addEventListener("click", (event) => {
        const index = parseInt(element.dataset.index, 10); // Parse data-index attribute
        if (typeof onItemClick === "function") {
          onItemClick(index); // Execute the callback with the index
        }
      });
    });
  }