import WeatherConditionIcon from "./WeatherConditionIcon";
import Forecast from "../models/Forecast";


export default function CurrentWeather(day, units) {
  if (!day) return document.createElement("div");

  let div = document.createElement("div");
  div.setAttribute("class", "current-weather");

  let city = document.createElement("h2");
  city.textContent = day.city || "Current Weather";

  let icon = WeatherConditionIcon({ day, size: "large" });

  let description = document.createElement("p");
  description.textContent = day.getDescription(); 

  let temp = document.createElement("p");
  let symbol = Forecast.getUnitOfMeasureSymbol(units, "temperature");
  temp.textContent = `Temp: ${Math.round(day.getTemperature())}${symbol}`;

  let feels = document.createElement("p");
  feels.textContent = `Feels like: ${Math.round(day.getFeelsLike(units))}${symbol}`;

  let humidity = document.createElement("p");
  humidity.textContent = `Humidity: ${day.getHumidity()}%`;

  div.appendChild(city);
  div.appendChild(icon);
  div.appendChild(description);
  div.appendChild(temp);
  div.appendChild(feels);
  div.appendChild(humidity);

  return div;
}
