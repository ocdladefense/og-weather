import ForecastCollection from "./ForecastCollection";
import { getDateKeysToUse } from "./dates";

/* Algorithm:
  Step 1: Retreive forecast array, usually containing 40 entries, and group them together based on their fulldate.
  Step 2: Calculate the 5 date keys that will be used for the 5 day weather forecast.
  Step 3: Populate each forecast day of the 5 date keys.
  Step 4: Push each forecast day into an array and return it.
*/

// Default function to be used in weather.js
// Returns an array holding 5 oneDay objects to be displayed to the user.
export default function parseForecast(forecast, timezoneOffset) {
  let simpleForecast = new Array(); //initialize array

  let groups = new ForecastCollection(forecast, timezoneOffset);

  let dateKeysToUse = getDateKeysToUse();

  //Iterates through each dateKey
  for (let dateKey of dateKeysToUse) {
    let day = groups.getDayForecast(dateKey);

    let oneDay = day.buildDaySummary(); // Populate the oneDay object with forecast data for the single day.

    simpleForecast.push(oneDay);
  }

  return simpleForecast;
}
