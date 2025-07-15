import DateUtils from "../utils/DateUtils";
import Sample from "./Sample";

// Class that processes weather forecast data for a single day.

export default class Forecast {

  samples;

  // Human readable label for the forecast, e.g., "Monday, January 1st"
  label;


  
  // i.e., the forecast for a single day, takes in a collection of samples.
  constructor(samples, timezoneOffset) {
    this.samples = samples;
    this.timezoneOffset = timezoneOffset;
  }

  setLabel(label) {
    this.label = label;
  }

  getLabel() {
    return this.label;
  }

  // Function that finds the closest hour match, because a match isn't always gonna be there since data is only given every 3 hours.
  findSampleAtHourApprox(hour, units = "imperial") {
    // let unitsLabel = units === "metric" ? "°C" : "°F";

    let diffs = this.samples.map((sample) => {
      let localHour = new Date((sample.dt + this.timezoneOffset) * 1000).getHours();
      return [Math.abs(localHour - hour), sample];
    });
   
    diffs.sort((a,b) => a[0] - b[0]);

    let [diff, sample] = diffs[0];

    return sample;

  }

  findTempAtHourApprox(hour, units = "imperial"){
    let sample = this.findSampleAtHourApprox(hour, units);

    let s = new Sample(sample);

    return s.getTemperature();
  }

  getFormattedDate() {
    return DateUtils.getFormattedDate(this.label);
  }



  // Function that finds the minimum temp in a samples array.
  findMinTemp() {
    return Math.min(...this.samples.map((f) => f.main.temp));
    // Loop through every sample entry, extract its temp_min, and return the smallest one
  }


  // Function that finds the maximum temp in a samples array.
  findMaxTemp() {
    return Math.max(...this.samples.map((f) => f.main.temp));
  }


  getIcon() {
    let noonEntry = this.findSampleAtHourApprox(12);

    return noonEntry.weather?.[0]?.icon ?? "";
  }


  getHigh() {
    return Math.round(this.findMaxTemp());
  }


  getLow() {
    return Math.round(this.findMinTemp());
  }

  getUnits() {
    return "°F";
  }

  getHumidity() {
    let noonEntry = this.findSampleAtHourApprox(12);
    return noonEntry.main.humidity ?? null;
  }


  getWind() {
    let noonEntry = this.findSampleAtHourApprox(12);
    return noonEntry.wind.speed ?? null;  
  }


  getPressure() {
    let noonEntry = this.findSampleAtHourApprox(12);
    return noonEntry.main.pressure ?? null;
  }


  getDescription() {
    let noonEntry = this.findSampleAtHourApprox(12);
    return noonEntry.weather?.[0]?.description ?? "";
  }


  getTemp(partOfDayString) {
    switch (partOfDayString) {
      case "morning":
        return this.findTempAtHourApprox(6);
      case "day":
        return this.findTempAtHourApprox(12);
      case "evening":
        return this.findTempAtHourApprox(18);
      case "night":
        return this.findTempAtHourApprox(21);
      default:
        return null;
    }
  }


}
