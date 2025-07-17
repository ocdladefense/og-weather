import Forecast from "./Forecast.js";
import DateUtils from "../utils/DateUtils.js";
import Sample from "./Sample.js";

// Class that contains all the forecast array data.
export default class ForecastCollection {
  #forecast = {};
  #samples;

  constructor(data, timezoneOffset) {

    let samples = data.map((day) => {
      let sample = Sample.fromOpen(day);
      sample.date = DateUtils.fromUnixTimestamp(day.dt, timezoneOffset);
      return sample;
    });

    this.#samples = samples;

    this.#forecast = Object.groupBy(samples, (sample) => {
      return sample.date.toString();
    })

    this.timezoneOffset = timezoneOffset;
  }

  // Function that returns a Forecast object, containing all the samples for that day.
  getDayForecast(dateString) {
    let daySamples = this.#forecast[dateString] || [];

    let forecast = new Forecast(daySamples, this.timezoneOffset);
    forecast.setLabel(dateString);

    return forecast;
  }
}
