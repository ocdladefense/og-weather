 // Render detailed weather information for the selected day
  // Relies on parameters instead of  'this.state' ect.
  export default function DayDetails(selectedDay, cityName = "") {
    const formattedDate = `${
      new Date(selectedDay.dt).getMonth() + 1
    }/${new Date(selectedDay.dt).getDate()}`;

    console.log("Selected Day Date:", selectedDay.dt);
    console.log("Selected Day Date Type:", typeof selectedDay.dt);
    console.log(selectedDay);

    // Div
    let dayDiv = document.createElement("div");
    dayDiv.classList.add("current-day-details")

    // Heading
    let h2 = document.createElement("h2");
    h2.textContent = `${cityName} - ${formattedDate}`;
    dayDiv.appendChild(h2);

    // Description with img Icon paragraph
    let pDesc = document.createElement("p");
    pDesc.textContent = selectedDay.description + " ";
    let icon = document.createElement("img");
    icon.src = `http://openweathermap.org/img/w/${selectedDay.icon}.png`;
    icon.alt = selectedDay.description;
    pDesc.appendChild(icon);
    dayDiv.appendChild(pDesc);

    // High/Low temp paragraph
    let pTemp = document.createElement("p");
    pTemp.textContent = `High: ${selectedDay.maxTemp}°F, Low: ${selectedDay.minTemp}°F`;
    dayDiv.appendChild(pTemp);

    // Humidity, wind, and pressue paragraph
    const pExtras = document.createElement("p");
    pExtras.textContent = `Humidity: ${selectedDay.humidity}%, Wind: ${selectedDay.wind} mph, Atmospheric Pressure: ${selectedDay.pressure} hPa`;
    dayDiv.appendChild(pExtras);

    // Morning and day temp paragraph
    const pMorningDay = document.createElement("p");
    pMorningDay.textContent = `Morning Temp: ${selectedDay.morningTemp}°F, Day Temp: ${selectedDay.dayTemp}°F`;
    dayDiv.appendChild(pMorningDay);

    // Evening and night temp paragraph
    const pEveningNight = document.createElement("p");
    pEveningNight.textContent = `Evening Temp: ${selectedDay.eveningTemp}°F, Night Temp: ${selectedDay.nightTemp}°F`;
    dayDiv.appendChild(pEveningNight);

    // const weatherDetailsHTML = `
    //   <div class="current-day-details">
    //   <h2>${cityName} - ${formattedDate}</h2>
    //     <p>${selectedDay.description} <img src="http://openweathermap.org/img/w/${selectedDay.icon}.png" alt="${selectedDay.description}"></p>
    //     <p>High: ${selectedDay.maxTemp}&deg;F, Low: ${selectedDay.minTemp}&deg;F</p>
    //     <p>Humidity: ${selectedDay.humidity}%, Wind: ${selectedDay.wind} mph, Atmospheric Pressure: ${selectedDay.pressure} hPa</p>
    //     <p>Morning Temp: ${selectedDay.morningTemp}&deg;F, Day Temp: ${selectedDay.dayTemp}&deg;F</p>
    //     <p>Evening Temp: ${selectedDay.eveningTemp}&deg;F, Night Temp: ${selectedDay.nightTemp}&deg;F</p>
    //   </div>
    // `;
    // this.$currentDay.innerHTML = weatherDetailsHTML;

    return dayDiv;
  }