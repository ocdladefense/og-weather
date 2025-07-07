 // Render detailed weather information for the selected day
  // Relies on parameters instead of  'this.state' ect.
  export default function DayDetails(selectedDay, cityName = "") {
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