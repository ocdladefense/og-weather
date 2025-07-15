import DateUtils from "../utils/DateUtils";

 // Render detailed weather information for the selected day
  export default function DayDetails(selectedDay, cityName = "") {
    let formattedDate = DateUtils.getFormattedDate(selectedDay);

    console.log("Selected Day Date:", selectedDay.dt);
    console.log("Selected Day Date Type:", typeof selectedDay.dt);
    console.log(selectedDay);

    // Div
    let dayDiv = document.createElement("div");
    dayDiv.setAttribute("id", "current-day");
    dayDiv.classList.add("current-day");

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
    let pExtras = document.createElement("p");
    pExtras.textContent = `Humidity: ${selectedDay.humidity}%, Wind: ${selectedDay.wind} mph, Atmospheric Pressure: ${selectedDay.pressure} hPa`;
    dayDiv.appendChild(pExtras);

    // Morning and day temp paragraph
    let pMorningDay = document.createElement("p");
    pMorningDay.textContent = `Morning Temp: ${selectedDay.morningTemp}°F, Day Temp: ${selectedDay.dayTemp}°F`;
    dayDiv.appendChild(pMorningDay);

    // Evening and night temp paragraph
    let pEveningNight = document.createElement("p");
    pEveningNight.textContent = `Evening Temp: ${selectedDay.eveningTemp}°F, Night Temp: ${selectedDay.nightTemp}°F`;
    dayDiv.appendChild(pEveningNight);

    return dayDiv;
  }