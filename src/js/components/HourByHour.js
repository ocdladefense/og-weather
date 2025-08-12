import WeatherConditionIcon from "./WeatherConditionIcon";
import Forecast from "../models/Forecast";


export default function HourByHour(forecast, units) {
  if (!forecast) return document.createElement("div");

  let div = document.createElement("div");
  div.classList.add("sample-collection");

  let label = forecast.label;

  let title = document.createElement("h2");
  title.classList.add("sample-collection-title");
  title.textContent = `Hour by hour forecast for ${label}.`;

  let listDiv = document.createElement("div");
  listDiv.classList.add("weather-list", "flex-parent");


  let samples = forecast.samples;


  samples.forEach((s) => {
    let item = document.createElement("div");
    item.setAttribute("class", "weather-list-item");

    let symbol = Forecast.getUnitOfMeasureSymbol(units, "temperature");


    let icon = WeatherConditionIcon({src: s.getIcon(), alt: s.getDescription(), size: "small"});
  


    let time = document.createElement("span");

  
    time.textContent = Forecast.formatHourAs12Hour(s.getDateTime().getHours()) + " ";
    item.appendChild(time);

    div.appendChild(icon);

    let temp = document.createElement("span");
    temp.textContent = "Temp: " + Math.round(s.temp) + symbol + ", ";
    item.appendChild(temp);

    let feelsLike = document.createElement("span");
    feelsLike.textContent = "Feels like: " + Math.round(s.feelsLike) + symbol + " ";
    item.appendChild(feelsLike);

    // let emptyDiv = document.createElement("div");
    // emptyDiv.innerHTML= "<br>";
    // item.appendChild(emptyDiv);

    listDiv.appendChild(item);

  });

  div.appendChild(title);
  div.appendChild(listDiv);

  return div;
}
