function findTempAtHourApprox(forecast, hour, timezoneOffset) {
  // finds the closest hour match, because a match isn't always gonna be there since data is only given every 3 hours.
  let closestEntry = null;
  let closestDiff = 24; // max hours in a day. Used to track the smallest difference between forecast hour and target hour.
  for (const f of forecast) {
    const localHour = new Date((f.dt + timezoneOffset) * 1000).getHours(); // get users local hours
    const diff = Math.abs(localHour - hour); // uses abs so there's no negatives.
    // If you're looking for 6 AM and this forecast is for 2 AM → |2 - 6| = 4
    if (diff < closestDiff) {
      // If this is the closest match so far, remember it
      closestDiff = diff;
      closestEntry = f;
    }
  }
  return closestEntry ? closestEntry.main.temp : null;
  // returns the entry closest to the desried time.
  // If nothing is found return null
}

function findMinTemp(forecast) {
  return Math.min(...forecast.map((f) => f.main.temp_min));
  // Loop through every forecast entry, extract its temp_min, and return the smallest one
}

function findMaxTemp(forecast) {
  return Math.max(...forecast.map((f) => f.main.temp_max));
  // Math.max returns the highest value found
}

export default function parseForecast(forecast, timezoneOffset) {
  let simpleForecast = new Array(); //initialize array

  // Object.groupBy loops through each item in forecast
  // Groups entries by local day
  const GROUPS = Object.groupBy(forecast, (entry) => {
    const LOCAL_TIMESTAMP = (entry.dt + timezoneOffset) * 1000; // Shift to forecast location’s local time
    const DATE = new Date(LOCAL_TIMESTAMP);
    const LOCAL_YEAR = DATE.getFullYear();
    const LOCAL_MONTH = String(DATE.getMonth() + 1).padStart(2, "0"); //Months are 0-indexed, so + 1 to get the correct month
    const LOCAL_DAY = String(DATE.getDate()).padStart(2, "0"); // 2 for two characters long. "0" so 3 => 03
    return `${LOCAL_YEAR}-${LOCAL_MONTH}-${LOCAL_DAY}`; // Format: YYYY-MM-DD
    // Separates forecast entries into keys. All entries from June 26th, 2025 are grouped under key "2025-06-26"
    // Each value is an array of 8 forecast entries for one day (3-hour intervals)
  });
  console.log(GROUPS);

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
  const DATE_KEYS_TO_USE = SORTED_KEYS.slice(startIndex, startIndex + 5); // get 5 days

  //Iterates through each dateKey
  for (const DATE_KEY of DATE_KEYS_TO_USE) {
    const ENTRIES = GROUPS[DATE_KEY];
    //ENTRIES holds the forecast entries for one day (up to 8 entries per day from OpenWeatherMap).

    let oneDay = { DATE_KEY };
    // initialize oneDay object with the current Key

    const NOONENTRY =
      ENTRIES.find(
        (f) => new Date((f.dt + timezoneOffset) * 1000).getHours() === 12
      ) ||
      //First choice: Find the forecast object for noon (12:00 PM)
      ENTRIES[4] ||
      //Second choice: Use the 5th entry in the list (entries[4]) — which is likely around midday, since forecasts are spaced every 3 hours.
      ENTRIES[0];
    //Last choice: Just use the first forecast of the day (entries[0]).

    oneDay.dt = new Date((NOONENTRY.dt + timezoneOffset) * 1000);
    oneDay.temp = NOONENTRY.main.temp;
    oneDay.minTemp = findMinTemp(ENTRIES);
    oneDay.maxTemp = findMaxTemp(ENTRIES);
    oneDay.morningTemp = findTempAtHourApprox(ENTRIES, 6, timezoneOffset);
    oneDay.dayTemp = findTempAtHourApprox(ENTRIES, 12, timezoneOffset);
    oneDay.eveningTemp = findTempAtHourApprox(ENTRIES, 18, timezoneOffset);
    oneDay.nightTemp = findTempAtHourApprox(ENTRIES, 21, timezoneOffset);
    oneDay.description = NOONENTRY.weather?.[0]?.description ?? "";
    oneDay.icon = NOONENTRY.weather?.[0]?.icon ?? "";
    oneDay.pressure = NOONENTRY.main.pressure ?? null;
    oneDay.wind = NOONENTRY.wind.speed ?? null;
    oneDay.humidity = NOONENTRY.main.humidity ?? null;

    simpleForecast.push(oneDay);
  }

  return simpleForecast;
}
