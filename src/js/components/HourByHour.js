import WeatherConditionIcon from "./WeatherConditionIcon";
import Forecast from "../models/Forecast";


export default function HourByHour(forecast, units) {
  if (!forecast) return document.createElement("div");

  let div = document.createElement("div");
  div.classList.add("sample-collection");

  // let label = forecast.label;

  // let title = document.createElement("h2");
  // title.classList.add("sample-collection-title");
  // title.textContent = `Hour by hour forecast for ${label}.`;

  let listDiv = document.createElement("div");
  listDiv.classList.add("weather-list", "flex-parent");


  let samples = forecast.samples;


  samples.forEach((s) => {
    let item = document.createElement("div");
    item.setAttribute("class", "sample-list-item");

    let symbol = Forecast.getUnitOfMeasureSymbol(units, "temperature");


    let icon = WeatherConditionIcon({src: s.getIcon(), alt: s.getDescription(), size: "small"});
  
    item.appendChild(icon);

    let time = document.createElement("span");

  
    time.textContent = Forecast.formatHourAs12Hour(s.getDateTime().getHours()) + " ";
    item.appendChild(time);


    let temp = document.createElement("span");
    temp.textContent = " - " + Math.round(s.temp) + symbol;
    item.appendChild(temp);

    listDiv.appendChild(item);

  });

  div.appendChild(listDiv);

  return div;
}
