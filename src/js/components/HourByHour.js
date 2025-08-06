import WeatherConditionIcon from "./WeatherConditionIcon";
import Forecast from "../models/Forecast";


export default function HourByHour(forecast, units) {
  if (!forecast) return document.createElement("div");

  let div = document.createElement("div");
  div.setAttribute("class", "sample-collection");

  let label = forecast.label;

  let title = document.createElement("h2");
  title.textContent = `Hour by hour forecast for ${label}.`;

  let listDiv = document.createElement("div");
  let item = document.createElement("div");

  let samples = forecast.samples;

  samples.forEach((s) => {
    let symbol = Forecast.getUnitOfMeasureSymbol(units, "temperature");

    let time = document.createElement("span");
    
    console.log(s.getDateTime());
    console.log("Sample time:", s.getDateTime().toString());
    console.log("Raw dt:", s.getData().dt, " Offset:", forecast.timezoneOffset);

    time.textContent = Forecast.formatHourAs12Hour(s.getDateTime().getHours()) + " ";
    item.appendChild(time);

    let temp = document.createElement("span");
    temp.textContent = "Temp: " + Math.round(s.temp) + symbol + " ";
    item.appendChild(temp);

    let feelsLike = document.createElement("span");
    feelsLike.textContent = "Feels like: " + Math.round(s.feelsLike) + symbol + ", ";
    item.appendChild(feelsLike);

    let emptyDiv = document.createElement("div");
    emptyDiv.innerHTML= "<br>";
    item.appendChild(emptyDiv);

    listDiv.appendChild(item);

  });

  div.appendChild(title);
  div.appendChild(listDiv);

  return div;
}
