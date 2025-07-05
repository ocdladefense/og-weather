// look up on mdn
let myDiv = document.createElement("div");
document.appendChild(childDiv);
myDiv.setAttribute("class", "weather-list-item");

// Render individual weather list item
// No longer includes event handlers, only displays view.
export default function WeatherListItem(forecastDay, index) {
  const formattedDate = `${new Date(forecastDay.dt).getMonth() + 1}/${new Date(
    forecastDay.dt
  ).getDate()}`;

  console.log(forecastDay.dt);

  // Use data-index instead of onclick, so it can be read by an event listener in app.js.
  return `<div class="weather-list-item"  data-index="${index}">
   ${formattedDate} - ${DateUtils.getWeekday(new Date(forecastDay.dt))}:
   High ${forecastDay.maxTemp}&deg;F, Low ${forecastDay.minTemp}&deg;F
 </div>`;
}
