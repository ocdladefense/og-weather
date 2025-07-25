import DateUtils from "../utils/DateUtils";
import Sample from "./Sample";

// Class that processes weather forecast data for a single day.

export default class Forecast {

  samples;

  // Human readable label for the forecast, e.g., "Monday, January 1st"
  label;


  // i.e., the forecast for a single day, takes in a collection of samples.
  constructor(samples, timezoneOffset) {

    this.samples = samples.map(s => s instanceof Sample ? s : Sample.fromOpenWeatherMap(s, timezoneOffset));

    //this.units = units;
  }


  
  setLabel(label) {
    this.label = label;
  }

  getLabel() {
    return this.label;
  }

  formatLabelAsWeekday() {
    console.log("ForecastItem label:", this.label);
    return DateUtils._getWeekday(this.label);
  }



  
  static convertTemperature(temp, unitsFrom, unitsTo) {

    if(unitsFrom === unitsTo) {
      return temp;
    }
    if (unitsFrom === "metric" && unitsTo === "imperial") {
      return (temp - 32) * 5 / 9;
    }

  }


  // Function that finds the closest hour match, because a match isn't always gonna be there since data is only given every 3 hours.
  findSampleAtHourApprox(hour, units = "imperial") {
    // let unitsLabel = units === "metric" ? "°C" : "°F";
      if (!this.samples || this.samples.length === 0) {
    console.warn("No samples available in Forecast");
    return null;
  }
    let diffs = this.samples.map((sample) => {
      let localHour = sample.getLocalHour().getHours();
      return [Math.abs(localHour - hour), sample];
    });
   
    diffs.sort((a,b) => a[0] - b[0]);

    let [diff, sample] = diffs[0];

    return [diff, sample];

  }

  findTempAtHourApprox(hour, units = "imperial"){

    let sample = this.findSampleAtHourApprox(hour, units)[1];

    let tempUnits = units === "metric" ? "celsius" : "fahrenheit"; 

    let convertedTemp = Forecast.convertTemperature(sample.getTemperature(), sample.getTempUnits(), tempUnits);

    return Math.round(convertedTemp);

    //...this.samples.map((s) => Forecast.convertTemperature(s.getTemperature(), s.getTempUnits(), tempUnits)));
  }





  getIcon() {
    let noonEntry = this.findSampleAtHourApprox(12)[1];

    return noonEntry.getIcon();
  }


  getHigh(units) {
    let tempUnits = units === "metric" ? "celsius" : "fahrenheit"; 
    let high = Math.max(...this.samples.map((s) => Forecast.convertTemperature(s.getTemperature(), s.getTempUnits(), tempUnits)));

    return Math.round(high);
  }


  getLow(units) {

    let tempUnits = units === "metric" ? "celsius" : "fahrenheit"; 

    let low = Math.min(...this.samples.map((s) => Forecast.convertTemperature(s.getTemperature(), s.getTempUnits(), tempUnits)));
    return Math.round(low);
  }

  static getUnitOfMeasureSymbol(units, type) {
    return type === "temperature" ? (units === "metric" ? "°C" : "°F") : (units === "metric" ? "m/s" : "mph");
  }


  getHumidity() {
    let noonEntry = this.findSampleAtHourApprox(12)[1];
    return noonEntry.getHumidity();
  }


  getWind() {
    let noonEntry = this.findSampleAtHourApprox(12)[1];
    return noonEntry.getWind();  
  }


  getPressure() {
    let noonEntry = this.findSampleAtHourApprox(12)[1];
    return noonEntry.getPressure();
  }


  getDescription() {
    let noonEntry = this.findSampleAtHourApprox(12)[1];
    return noonEntry.getDescription();
  }


  getTemp(partOfDayString, units) {
    switch (partOfDayString) {
      case "morning":
        return this.findTempAtHourApprox(6, units);
      case "day":
        return this.findTempAtHourApprox(12, units);
      case "evening":
        return this.findTempAtHourApprox(18, units);
      case "night":
        return this.findTempAtHourApprox(21,units);
      default:
        return null;
    }
  }

}
