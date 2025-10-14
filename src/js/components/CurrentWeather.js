import WeatherConditionIcon from "./WeatherConditionIcon";
import Forecast from "../models/Forecast";


export default function CurrentWeather({sample, units}) {
  if (!sample) return document.createElement("div");


  let div = document.createElement("div");
  div.setAttribute("class", "current-weather");

  let city = document.createElement("h2");
  let cityName = sample.getCity();
  city.textContent = "Current Weather in " + cityName || "Current Weather";

  let icon = WeatherConditionIcon({src: sample.getIcon(), alt: sample.getDescription(), size: "large"});
  

  let time = document.createElement("p");
  time.textContent = Forecast.formatHourAs12Hour(sample.getDateTime().getHours());

  let description = document.createElement("p");
  description.textContent = sample.getDescription(); 

  let temp = document.createElement("p");
  let symbol = Forecast.getUnitOfMeasureSymbol(units, "temperature");
  temp.textContent = `Temp: ${Math.round(sample.getTemperature())}${symbol}`;

  let feels = document.createElement("p");
  feels.textContent = `Feels like: ${Math.round(sample.getFeelsLike(units))}${symbol}`;

  let humidity = document.createElement("p");
  humidity.textContent = `Humidity: ${sample.getHumidity()}%`;

  div.appendChild(city);
  div.appendChild(icon);
  div.appendChild(time);
  div.appendChild(description);
  div.appendChild(temp);
  div.appendChild(feels);
  div.appendChild(humidity);

  return div;
}
