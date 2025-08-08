import SampleCollection from "../../models/SampleCollection";
import Forecast from "../../models/Forecast";
import DateUtils from "../../utils/DateUtils";

/* Algorithm:
  Step 1: Retreive forecast array, usually containing 40 entries, and group them together based on their fulldate.
  Step 2: Calculate the 5 date keys that will be used for the 5 day weather forecast.
  Step 3: Populate each forecast day of the 5 date keys.
  Step 4: Push each forecast day into an array and return it.
*/

// Default function to be used in app.js
// Returns an array holding 5 objects to be displayed to the user.
export default function fiveDayForecast(data, units, timezoneOffset = 0) {

  let forecast = []; //initialize array

  let samples = new SampleCollection(data, units, timezoneOffset);

  let groups = samples.groupBy("date");

  const NUMBER_OF_DAYS = 5;
  // TODO: pass in current date time with respect to timezone offset.

  let localDate = new Date();
  console.log(timezoneOffset);
  // console.log(localDate);

  // const timezoneOffseet = 28800; // seconds for Hong Kong
  // const localHKTime = new Date(Date.now() + timezoneOffseet * 1000);

  // console.log("Local Hong Kong Time:", localHKTime); 

  // console.log("Offset (sec):", timezoneOffset);
  // console.log("Local date:", localDate.toString());

  let range = DateUtils.createRange(localDate, NUMBER_OF_DAYS);

  let keys = range.map((date) => {
    return date.toString();
  });

  // Iterates through each dateKey
  for (let key of keys) {
    let daySamples = groups[key] || [];
    let f = new Forecast(daySamples, units, timezoneOffset);
    f.setLabel(key); // "2024-02-04"; 
    // we're still no quite sure how to articulate the importance of this label, but it is used in the UI to display the date.

    forecast.push(f);
  }

  return forecast;
}


