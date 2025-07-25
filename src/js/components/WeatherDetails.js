import DateUtils from "../utils/DateUtils";
import WeatherConditionIcon from "./WeatherConditionIcon";
import Forecast from "../models/Forecast";

 // Render detailed weather information for the selected day
  export default function WeatherDetails({day, units, cityName = ""}) {
    let formattedDate = DateUtils.getFormattedDate(day.getLabel());
    console.log(day.getLabel());

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
    let symbol = Forecast.getUnitOfMeasureSymbol(units, "temperature");
    let lowTempText = `Low: ${day.getLow(units)}`;
    let highTempText = `High: ${day.getHigh(units)}`;

    pTemp.textContent = [highTempText,symbol,"/",lowTempText,symbol].join(" ");
    dayDiv.appendChild(pTemp);

    // Humidity paragraph
    let pHum = document.createElement("p");
    pHum.textContent = `Humidity: ${day.getHumidity()}%`;
    dayDiv.appendChild(pHum);

    // Wind paragraph
    let pWind =document.createElement("p");
    pWind.textContent = `Wind: ${day.getWind()} mph`;
    dayDiv.appendChild(pWind);
   
    // Pressure Paragraph
    let pPres =document.createElement("p");
    pPres.textContent = `Atmospheric Pressure: ${day.getPressure()} hPa`;
    dayDiv.appendChild(pPres);
    


    // Morning and day temp paragraph
    let parts = ["morning","day","evening","night"].map(function(part) { 
      let symbol = Forecast.getUnitOfMeasureSymbol(units, "temperature");
    
      let p = document.createElement("p");
      p.setAttribute("id", `temp-${part}`);

      let label = `${part.charAt(0).toUpperCase() + part.slice(1)} Temp: `;
      let value = day.getTemp(part, units);

      p.textContent = `${label}${value}${symbol}`;

      return p;
    });


    dayDiv.append(...parts);



    return dayDiv;
  }