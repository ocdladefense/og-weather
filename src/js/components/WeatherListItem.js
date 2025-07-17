
import WeatherIcon from "./WeatherIcon";
import DateUtils from "../utils/DateUtils";


// Render individual weather list item
export default function WeatherListItem(day, onItemClick, index) {
  let formattedDate = day.getFormattedDate();


  // Creates div with its attributes.
  let div = document.createElement("div");
  div.setAttribute("class", "weather-list-item");
  div.setAttribute("data-index", index);

  // Construct the text content.
  // How do we convert "2025-07-15" to "Tuesday"?
  let label = document.createElement("span");
  label.setAttribute("class","label");
  label.textContent = DateUtils.getWeekday(day.getLabel());

  let icon = WeatherIcon(day);

  let high = document.createElement("span");
  high.setAttribute("class", "high");
  high.textContent = day.getHigh() + " " + day.getUnits();

  let low = document.createElement("span");
  low.setAttribute("class", "low");
  low.textContent = day.getLow() + " " + day.getUnits();

  
  div.appendChild(label);
  div.appendChild(icon);
  div.appendChild(high);
  div.appendChild(document.createTextNode(" / "));
  div.appendChild(low);

  div.addEventListener("click", onItemClick);

 return div;
}
