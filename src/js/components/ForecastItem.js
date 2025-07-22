
import WeatherConditionIcon from "./WeatherConditionIcon";
import DateUtils from "../utils/DateUtils";

// Render individual weather list item
export default function WeatherListItem(day, onItemClick, index) {


  // Creates div with its attributes.
  let div = document.createElement("div");
  div.setAttribute("class", "weather-list-item");
  div.setAttribute("data-index", index);

  // Construct the text content.
  let label = document.createElement("span");
  label.setAttribute("class","label");
  label.textContent = day.getWeekdayLabel();

  let icon = WeatherConditionIcon({day: day, size: "small"});

  let high = document.createElement("span");
  high.setAttribute("class", "high");
  high.textContent = day.getHigh();

  let low = document.createElement("span");
  low.setAttribute("class", "low");
  low.textContent = day.getLow();

  
  div.appendChild(label);
  div.appendChild(icon);
  div.appendChild(high);
  div.appendChild(document.createTextNode(" / "));
  div.appendChild(low);

  div.addEventListener("click", onItemClick);

 return div;
}
