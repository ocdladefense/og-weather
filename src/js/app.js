import "./general";
// without this I get an error at runtime.  babel 7 and preset env.
const regeneratorRuntime = require("regenerator-runtime");

// parseForecast is the ONLY export (default) from weatherParsing.js
import parseForecast from "./weatherParsing";
// getWeekday are methods from DateUtils.js
import AppView from "./components";

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

    // UI elements are now managed by View
    AppView.$form.addEventListener("submit", this.onFormSubmit.bind(this)); // Bind 'this' for the callback
  }

  // This method handles rendering the detailed view for a specific day.
  // It remains in Weather because it needs access to this.state.forecast and this.state.city.
  renderCurrentDay(index) {
    // This is an instance method
    const selectedDay = this.state.forecast[index];
    const cityName = this.state.city.name;
    // Call the static render method on View, passing all necessary data
    AppView.renderCurrentDayDetails(selectedDay, cityName);
  }

  // Handle form submission
  onFormSubmit(event) {
    event.preventDefault();
    this.state.zipcode = AppView.$zipcode.value;

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
            AppView.renderWeatherList(
              this.state.forecast,
              this.renderCurrentDay.bind(this)
            );
            AppView.clearCurrentDay();

            // Clear the zipcode from the UI
            AppView.$zipcode.value = "";
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
