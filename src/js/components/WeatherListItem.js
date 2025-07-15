import DateUtils from "../utils/DateUtils";

// Render individual weather list item
// No longer includes event handlers, only displays view.
export default function WeatherListItem(forecastDay, onItemClick, index) {
  let formattedDate = DateUtils.getFormattedDate(forecastDay);

  console.log(forecastDay.dt);

  // Creates div with it's attributes
  let itemDiv = document.createElement("div");
  itemDiv.setAttribute("class", "weather-list-item");
  itemDiv.setAttribute("data-index", index);

  // Construct the text content
  const weekday = DateUtils.getWeekday(new Date(forecastDay.dt));
  const text = `${formattedDate} - ${weekday}: High ${forecastDay.maxTemp}°F, Low ${forecastDay.minTemp}°F`;

  // Add text content to the div
  itemDiv.textContent = text;
  itemDiv.addEventListener("click", onItemClick);

 return itemDiv;
}
