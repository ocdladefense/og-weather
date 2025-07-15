import Forecast from "./Forecast.js";
import DateUtils from "../utils/DateUtils.js";

// Class that contains all the forecast array data.
export default class ForecastCollection {
  #forecast = {};

  constructor(forecast, timezoneOffset) {
    this.#forecast = Object.groupBy(forecast, (entry) => {
      let date = DateUtils.fromUnixTimestamp(entry.dt, timezoneOffset);
      return date.toString();
    });

    this.timezoneOffset = timezoneOffset;
  }

  // Function that returns a Forecast object, containing all the samples for that day.
  getDayForecast(dateString) {
    let f = new Forecast(this.#forecast[dateString] || [], this.timezoneOffset);
    f.setLabel(dateString);

    return f;
  }
}
