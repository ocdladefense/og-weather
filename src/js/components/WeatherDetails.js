import DateUtils from "../utils/DateUtils";
import WeatherConditionIcon from "./WeatherConditionIcon";

 // Render detailed weather information for the selected day
  export default function WeatherDetails(day, cityName = "") {
    let formattedDate = DateUtils.getFormattedDate(day);

    // Div
    let dayDiv = document.createElement("div");
    dayDiv.setAttribute("id", "current-day");
    dayDiv.classList.add("current-day");

    // Heading
    let h2 = document.createElement("h2");
    h2.textContent = `${cityName} - ${formattedDate}`;
    dayDiv.appendChild(h2);

    // Description with img Icon paragraph
    let pDesc = document.createElement("p");
    pDesc.textContent = day.getDescription() + " ";
    let icon = WeatherConditionIcon({day: day, size: "large"});
    pDesc.appendChild(icon);
    dayDiv.appendChild(pDesc);

    // High/Low temp paragraph
    let pTemp = document.createElement("p");
    pTemp.textContent = `High: ${day.getHigh()}, Low: ${day.getLow()}`;
    dayDiv.appendChild(pTemp);

    // Humidity, wind, and pressue paragraph
    let pExtras = document.createElement("p");
    pExtras.textContent = `Humidity: ${day.getHumidity()}%, Wind: ${day.getWind()} mph, Atmospheric Pressure: ${day.getPressure()} hPa`;
    dayDiv.appendChild(pExtras);

    // Morning and day temp paragraph
    let parts = ["morning","day","evening","night"].map(function(part) { 
      let p = document.createElement("p");
      p.setAttribute("id", `temp-${part}`);

      let label = `${part.charAt(0).toUpperCase() + part.slice(1)} Temp: `;
      let value = day.getTemp(part);

      p.textContent = `${label}${value}`;

      return p;
    });


    dayDiv.append(...parts);



    return dayDiv;
  }