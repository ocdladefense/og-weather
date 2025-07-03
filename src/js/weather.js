// same as previous lab
import "./general";
// without this I get an error at runtime.  babel 7 and preset env.
const regeneratorRuntime = require("regenerator-runtime");

// parseForecast is the ONLY export (default) from weatherParsing.js
import parseForecast from "./weatherParsing";
// getWeekday are methods from DateUtils.js
import DateUtils from "./DateUtils";

// sample openweathermap weather api call
//https://api.openweathermap.org/data/2.5/forecast?units=imperial&lat=43.9698&lon=-123.2006&appid=e366707bc2ea3e949fb1c0a16ce76d59
// sample openweathermap geolocation api call
// http://api.openweathermap.org/geo/1.0/zip?zip=97405,US&appid=e366707bc2ea3e949fb1c0a16ce76d59

class Weather {
  constructor() {
    this.state = {
      timezoneOffset: 0,
      zipcode: "",
      city: {},
      forecast: [],
      selectedDate: null,
    };
    this.weatherUrl =
      "https://api.openweathermap.org/data/2.5/forecast?units=imperial&";
    this.geoUrl = "http://api.openweathermap.org/geo/1.0/zip?";
    this.apikey = "appid=f62d906d0cba21cc74c1fceb053bcb7e";

    this.$form = document.querySelector("#zipForm");
    this.$zipcode = document.querySelector("#zipcode");
    this.$weatherList = document.querySelector("#weatherList");
    this.$currentDay = document.querySelector("#currentDay");

    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.$form.addEventListener("submit", this.onFormSubmit);
  }

  // Render individual weather list item
  renderWeatherListItem(forecastDay, index) {
    const formattedDate = `${
      new Date(forecastDay.dt).getMonth() + 1
    }/${new Date(forecastDay.dt).getDate()}`;
    console.log(forecastDay.dt);
    return `<div class="weather-list-item" onclick="weather.renderCurrentDay(${index})">
   ${formattedDate} - ${DateUtils.getWeekday(new Date(forecastDay.dt))}:
   High ${forecastDay.maxTemp}&deg;F, Low ${forecastDay.minTemp}&deg;F
 </div>`;
  }

  // Render the entire weather list
  renderWeatherList(forecastDays) {
    const itemsHTML = forecastDays
      .map((forecastDay, index) =>
        this.renderWeatherListItem(forecastDay, index)
      )
      .join("");
    this.$weatherList.innerHTML = `<div class="weather-list flex-parent">${itemsHTML}</div>`;

    // Add click event handlers to each weather list item
    const forecastElements = document.querySelectorAll(".weather-list-item");
    forecastElements.forEach((element, index) => {
      element.onclick = this.renderCurrentDay.bind(this, index);
    });
  }

  // Render detailed weather information for the selected day
  renderCurrentDay(index) {
    const selectedDay = this.state.forecast[index];
    const formattedDate = `${
      new Date(selectedDay.dt).getMonth() + 1
    }/${new Date(selectedDay.dt).getDate()}`;

    console.log("Selected Day Date:", selectedDay.dt);
    console.log("Selected Day Date Type:", typeof selectedDay.dt);
    console.log(selectedDay);
    const weatherDetailsHTML = `
      <div class="current-day-details">
      <h2>${this.state.city.name} - ${formattedDate}</h2>
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
  clearCurrentDay() {
    this.$currentDay.innerHTML = "";
  }

  // Handle form submission
  onFormSubmit(event) {
    event.preventDefault();
    this.state.zipcode = this.$zipcode.value;

    // Fetch geolocation information
    fetch(`${this.geoUrl}zip=${this.state.zipcode},US&${this.apikey}`)
      .then((response) => response.json())
      .then((data) => {
        this.state.city.name = data.name;
        this.state.city.lat = data.lat;
        this.state.city.lng = data.lon;

        // Fetch weather information based on geolocation
        fetch(
          `${this.weatherUrl}lat=${this.state.city.lat}&lon=${this.state.city.lng}&${this.apikey}`
        )
          .then((response) => response.json())
          .then((data) => {
            this.state.timezoneOffset = data.city.timezone;
            this.state.forecast = parseForecast(
              data.list,
              this.state.timezoneOffset
            );

            // Render the weather list and clear the current day details
            this.renderWeatherList(this.state.forecast);
            this.clearCurrentDay();

            // Clear the zipcode from the UI
            this.$zipcode.value = "";
          });
      })
      .catch((error) => {
        alert("There was a problem getting location information!");
      });
  }
}

// Initialize the Weather class on window load
window.onload = () => {
  new Weather();
};
