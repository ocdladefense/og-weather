import DateUtils from "../utils/DateUtils";
import Forecast from "../models/Forecast";
import WeatherConditionIcon from "./WeatherConditionIcon";


// Render individual weather list item
export default function ForecastItem(day, units, onItemClick, index) {


  // Creates div with its attributes.
  let div = document.createElement("div");
  div.setAttribute("class", "weather-list-item");
  div.setAttribute("data-index", index);

  // Construct the text content.
  let label = document.createElement("span");
  label.setAttribute("class","label");

  // Labels are currently stored in "YYYY-MM-DD" format.
  // Show the weekday label, e.g., "Monday", "Tuesday", etc.
  label.textContent = day.formatLabelAsWeekday();
  console.log("ForecastItem label:", label.textContent);

  // Create the icon for the weather condition.
  // The icon is a small image that represents the weather condition for the day.
  // It uses the WeatherConditionIcon component to render the icon based on the weather condition.
  // The icon is displayed next to the label.
  let icon = WeatherConditionIcon({day: day, size: "small"});

  let high = document.createElement("span");
  high.setAttribute("class", "high");
  high.textContent = day.getHigh(units) + " " + Forecast.getUnitOfMeasureSymbol(units, "temperature");

  let low = document.createElement("span");
  low.setAttribute("class", "low");
  low.textContent = day.getLow(units) + " " + Forecast.getUnitOfMeasureSymbol(units, "temperature");

  
  div.appendChild(label);
  div.appendChild(icon);
  div.appendChild(high);
  div.appendChild(document.createTextNode(" / "));
  div.appendChild(low);

  div.addEventListener("click", onItemClick);

 return div;
}
