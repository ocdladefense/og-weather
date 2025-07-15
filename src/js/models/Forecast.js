import DateUtils from "../utils/DateUtils";

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
  findTempAtHourApprox(hour, units = "imperial") {
    let unitsLabel = units === "metric" ? "°C" : "°F";
    let closestEntry = null;
    let closestDiff = 24; // max hours in a day. Used to track the smallest difference between forecast hour and target hour.

    for (let f of this.samples) {
      let localHour = new Date((f.dt + this.timezoneOffset) * 1000).getHours();
      let diff = Math.abs(localHour - hour);
      if (diff < closestDiff) {
        // If this is the closest match so far, remember it
        closestDiff = diff;
        closestEntry = f;
      }
    }

    return closestEntry ? (closestEntry.main.temp + " " + unitsLabel) : null;
    // returns the entry closest to the desired time.
  }


  getFormattedDate() {
    return DateUtils.getFormattedDate(this.label);
  }



  // Function that finds the minimum temp in a samples array.
  findMinTemp() {
    return Math.min(...this.samples.map((f) => f.main.temp_min));
    // Loop through every sample entry, extract its temp_min, and return the smallest one
  }


  // Function that finds the maximum temp in a samples array.
  findMaxTemp() {
    return Math.max(...this.samples.map((f) => f.main.temp_max));
  }


  // This function finds the forecast entry closest to the given time.
  findClosestEntryToHour(hourToLookFor) {
    // Step 1: Find the closest entry to the specified hour
    let closestEntry = null;
    let closestDiff = 24; // max possible diff in hours

    for (let f of this.samples) {
      let localHour = new Date((f.dt + this.timezoneOffset) * 1000).getHours();
      let diff = Math.abs(localHour - hourToLookFor);
      if (closestEntry === null || diff < closestDiff) {
        closestDiff = diff;
        closestEntry = f;
      }
    }

    // Step 2: Fallbacks in case of empty data
    return closestEntry || this.samples[4] || this.samples[0] || null;
  }


  getIcon() {
    let noonEntry = this.findClosestEntryToHour(12);

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
    let noonEntry = this.findClosestEntryToHour(12);
    return noonEntry.main.humidity ?? null;
  }


  getWind() {
    let noonEntry = this.findClosestEntryToHour(12);
    return noonEntry.wind.speed ?? null;  
  }


  getPressure() {
    let noonEntry = this.findClosestEntryToHour(12);
    return noonEntry.main.pressure ?? null;
  }


  getDescription() {
    let noonEntry = this.findClosestEntryToHour(12);
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
