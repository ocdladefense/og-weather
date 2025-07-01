// Class that processes weather forecast data for a single day.
export default class Forecast {
  // i.e., the forecast for a single day, takes in a collection of samples.
  constructor(samples, timezoneOffset) {
    this.samples = samples;
    this.timezoneOffset = timezoneOffset;
  }

  // Function that finds the closest hour match, because a match isn't always gonna be there since data is only given every 3 hours.
  findTempAtHourApprox(forecast, hour, timezoneOffset) {
    let closestEntry = null;
    let closestDiff = 24; // max hours in a day. Used to track the smallest difference between forecast hour and target hour.

    for (let f of forecast) {
      let localHour = new Date((f.dt + timezoneOffset) * 1000).getHours();
      let diff = Math.abs(localHour - hour);
      if (diff < closestDiff) {
        // If this is the closest match so far, remember it
        closestDiff = diff;
        closestEntry = f;
      }
    }

    return closestEntry ? closestEntry.main.temp : null;
    // returns the entry closest to the desired time.
  }

  // Function that finds the minimum temp in a samples array.
  findMinTemp(samples) {
    return Math.min(...samples.map((f) => f.main.temp_min));
    // Loop through every sample entry, extract its temp_min, and return the smallest one
  }

  // Function that finds the maximum temp in a samples array.
  findMaxTemp(samples) {
    return Math.max(...samples.map((f) => f.main.temp_max));
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

  // This function will create and return an object holding one days worth of forecast data.
  buildDaySummary() {
    let oneDay = {}; // Create a new object to hold the day's forecast

    let noonEntry = this.findClosestEntryToHour(12);

    oneDay.dt = new Date((noonEntry.dt + this.timezoneOffset) * 1000);
    oneDay.temp = noonEntry.main.temp;
    oneDay.minTemp = this.findMinTemp(this.samples);
    oneDay.maxTemp = this.findMaxTemp(this.samples);
    oneDay.morningTemp = this.findTempAtHourApprox(
      this.samples,
      6,
      this.timezoneOffset
    );
    oneDay.dayTemp = this.findTempAtHourApprox(
      this.samples,
      12,
      this.timezoneOffset
    );
    oneDay.eveningTemp = this.findTempAtHourApprox(
      this.samples,
      18,
      this.timezoneOffset
    );
    oneDay.nightTemp = this.findTempAtHourApprox(
      this.samples,
      21,
      this.timezoneOffset
    );
    oneDay.description = noonEntry.weather?.[0]?.description ?? "";
    oneDay.icon = noonEntry.weather?.[0]?.icon ?? "";
    oneDay.pressure = noonEntry.main.pressure ?? null;
    oneDay.wind = noonEntry.wind.speed ?? null;
    oneDay.humidity = noonEntry.main.humidity ?? null;

    return oneDay;
  }
}
