// Function that finds the closest hour match, because a match isn't always gonna be there since data is only given every 3 hours.
function findTempAtHourApprox(forecast, hour, timezoneOffset) {
  let closestEntry = null;
  let closestDiff = 24; // max hours in a day. Used to track the smallest difference between forecast hour and target hour.

  for (const f of forecast) {
    const localHour = new Date((f.dt + timezoneOffset) * 1000).getHours();
    const diff = Math.abs(localHour - hour);
    if (diff < closestDiff) {
      // If this is the closest match so far, remember it
      closestDiff = diff;
      closestEntry = f;
    }
  }

  return closestEntry ? closestEntry.main.temp : null;
  // returns the entry closest to the desried time.
}

// Function that finds the minimum temp in a forecast array.
function findMinTemp(forecast) {
  return Math.min(...forecast.map((f) => f.main.temp_min));
  // Loop through every forecast entry, extract its temp_min, and return the smallest one
}

// Function that finds the maximum temp in a forecast array.
function findMaxTemp(forecast) {
  return Math.max(...forecast.map((f) => f.main.temp_max));
}

// Function that returns a date object in the users local time
function groupByFullDate(entry) {
  let timezoneOffset = entry.timezone || 0; // Default to 0 if no timezone is provided
  const local = (entry.dt + timezoneOffset) * 1000; // Shift to forecast location’s local time
  const date = new Date(local);

  return getAsFullDateString(date);
}

// Function that converts a js date object into a string.
function getAsFullDateString(date) {
  let year = date.getFullYear();
  let month = String(date.getMonth() + 1).padStart(2, "0");
  let day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`; // Format: YYYY-MM-DD
}

// Function that finds the 5 forcast days to display to the user.
function getDateKeysToUse(numDays = 5, startDate = new Date()) {
  //
  /*
  const CURRENT_UTC = Math.floor(Date.now() / 1000); // now in seconds
  const LOCAL_NOW = new Date((CURRENT_UTC + timezoneOffset) * 1000);

  const TODAY_KEY = `${LOCAL_NOW.getFullYear()}-${String(
    LOCAL_NOW.getMonth() + 1
  ).padStart(2, "0")}-${String(LOCAL_NOW.getDate()).padStart(2, "0")}`;

  const SORTED_KEYS = Object.keys(GROUPS).sort();

  let startIndex = SORTED_KEYS.indexOf(TODAY_KEY); // get current days key
  // If TODAY_KEY isn't found, start from the closest available future day
  if (startIndex === -1) {
    startIndex = SORTED_KEYS.findIndex((key) => {
      const keyDate = new Date(`${key}T00:00:00`);
      return keyDate >= LOCAL_NOW;
    });
    if (startIndex === -1) startIndex = 0; // fallback to first index if all else fails
  }

  return SORTED_KEYS.slice(startIndex, startIndex + 5); // get 5 days */

  return ["2025-06-28", "2025-06-29", "2025-06-30", "2025-07-01", "2025-07-02"];
}

// Class that
class ForecastCollection {
  #forecast = {};

  constructor(forecast, timezoneOffset) {
    this.#forecast = Object.groupBy(forecast, groupByFullDate);
    this.timezoneOffset = timezoneOffset;
  }

  getForecast(dateString) {
    return new Forecast(this.#forecast[dateString] || [], this.timezoneOffset);
  }
}

// Class that
class Forecast {
  /// i.e., the forecast for a single day, takes in a collection of samples.

  constructor(samples, timezoneOffset) {
    this.samples = samples;
    this.timezoneOffset = timezoneOffset;
  }

  // You need to be able to articulate the problem you are trying to solve and how your code solves it.
  // This function finds the forecast entry closest to noon (12:00 PM) or uses
  // the 5th entry in the list (which is likely around midday) or defaults... do better on this, i.e., take in a time and search for that.
  findSomethingClose(hourToLookFor) {
    // Step 1: Find the closest entry to the specified hour
    let closestEntry = null;
    let closestDiff = 24; // max possible diff in hours

    for (const f of this.samples) {
      const localHour = new Date(
        (f.dt + this.timezoneOffset) * 1000
      ).getHours();
      const diff = Math.abs(localHour - hourToLookFor);
      if (closestEntry === null || diff < closestDiff) {
        closestDiff = diff;
        closestEntry = f;
      }
    }

    // Step 2: Fallbacks in case of empty data
    return closestEntry || this.samples[4] || this.samples[0] || null;
  }

  getForecast() {
    let oneDay = {}; // Create a new object to hold the day's forecast

    let noonEntry = this.findSomethingClose(12);

    oneDay.dt = new Date((noonEntry.dt + this.timezoneOffset) * 1000);
    oneDay.temp = noonEntry.main.temp;
    oneDay.minTemp = findMinTemp(this.samples);
    oneDay.maxTemp = findMaxTemp(this.samples);
    oneDay.morningTemp = findTempAtHourApprox(
      this.samples,
      6,
      this.timezoneOffset
    );
    oneDay.dayTemp = findTempAtHourApprox(
      this.samples,
      12,
      this.timezoneOffset
    );
    oneDay.eveningTemp = findTempAtHourApprox(
      this.samples,
      18,
      this.timezoneOffset
    );
    oneDay.nightTemp = findTempAtHourApprox(
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

export default function parseForecast(forecast, timezoneOffset) {
  let simpleForecast = new Array(); //initialize array

  const GROUPS = new ForecastCollection(forecast, timezoneOffset);

  //Iterates through each dateKey
  for (const DATE_KEY of getDateKeysToUse(5, forecast, timezoneOffset)) {
    const day = GROUPS.getForecast(DATE_KEY);

    let oneDay = day.getForecast(); // Create a new Forecast object for the day

    simpleForecast.push(oneDay);
  }

  return simpleForecast;
}
