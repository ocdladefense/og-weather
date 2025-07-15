import DateUtils from "../DateUtils";

export default class AppView {
  // Static properties for DOM elements, accessible as AppView.$element
  static $form = document.querySelector("#zipForm");
  static $zipcode = document.querySelector("#zipcode");
  static $weatherList = document.querySelector("#weatherList");
  static $currentDay = document.querySelector("#currentDay");

  static render({ forecast, onSubmit }) {
    let $form = document.querySelector("#zipForm");
    $form.addEventListener("submit", onSubmit);

    return AppView.renderWeatherList(forecast);
  }

  // Render individual weather list item
  // No longer includes event handlers, only displays view.
  static renderWeatherListItem(forecastDay, index) {
    const formattedDate = `${
      new Date(forecastDay.dt).getMonth() + 1
    }/${new Date(forecastDay.dt).getDate()}`;

    console.log(forecastDay.dt);

    // Use data-index instead of onclick, so it can be read by an event listener in app.js.
    return `<div class="weather-list-item"  data-index="${index}">
   ${formattedDate} - ${DateUtils.getWeekday(new Date(forecastDay.dt))}:
   High ${forecastDay.maxTemp}&deg;F, Low ${forecastDay.minTemp}&deg;F
 </div>`;
  }

  // Render the entire weather list
  static renderWeatherList(forecastDays) {
    const itemsHTML = forecastDays
      .map((forecastDay, index) =>
        this.renderWeatherListItem(forecastDay, index)
      )
      .join("");

    let onItemClick = (index) => {
      const selectedDay = forecastDays[index];
      AppView.renderCurrentDayDetails(selectedDay);
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

  // Render detailed weather information for the selected day
  // Relies on parameters instead of  'this.state' ect.
  // No longer
  static renderCurrentDayDetails(selectedDay, cityName = "") {
    const formattedDate = `${
      new Date(selectedDay.dt).getMonth() + 1
    }/${new Date(selectedDay.dt).getDate()}`;

    console.log("Selected Day Date:", selectedDay.dt);
    console.log("Selected Day Date Type:", typeof selectedDay.dt);
    console.log(selectedDay);

    const weatherDetailsHTML = `
      <div class="current-day-details">
      <h2>${cityName} - ${formattedDate}</h2>
        <p>${selectedDay.description} <img src="http://openweathermap.org/img/w/${selectedDay.icon}.png" alt="${selectedDay.description}"></p>
        <p>High: ${selectedDay.maxTemp}&deg;F, Low: ${selectedDay.minTemp}&deg;F</p>
        <p>Humidity: ${selectedDay.humidity}%, Wind: ${selectedDay.wind} mph, Atmospheric Pressure: ${selectedDay.pressure} hPa</p>
        <p>Morning Temp: ${selectedDay.morningTemp}&deg;F, Day Temp: ${selectedDay.dayTemp}&deg;F</p>
        <p>Evening Temp: ${selectedDay.eveningTemp}&deg;F, Night Temp: ${selectedDay.nightTemp}&deg;F</p>
      </div>
    `;
    this.$currentDay.innerHTML = weatherDetailsHTML;
  }

  // Clear the inner HTML of the current day details
  static clearCurrentDay() {
    this.$currentDay.innerHTML = "";
  }
}
