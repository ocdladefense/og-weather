import WeatherConditionIcon from "./WeatherConditionIcon";

export default function CurrentWeather(day) {
  if (!day) return document.createElement("div");

  let div = document.createElement("div");
  div.className = "current-weather-card";

  let city = document.createElement("h2");
  city.textContent = day.city || "Current Weather";

  let icon = WeatherConditionIcon({ day, size: "large" });

  let description = document.createElement("p");
  description.textContent = day.getDescription(); 

  let temp = document.createElement("p");
  temp.textContent = `Temp: ${day.getTemperature()}°`;

 // let feels = document.createElement("p");
 // feels.textContent = `Feels like: ${day.getFeelsLike()}°`;

  let humidity = document.createElement("p");
  humidity.textContent = `Humidity: ${day.getHumidity()}%`;

  div.appendChild(city);
  div.appendChild(icon);
  div.appendChild(description);
  div.appendChild(temp);
  //div.appendChild(feels);
  div.appendChild(humidity);

  return div;
}
