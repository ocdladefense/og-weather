import Forecast from "./Forecast.js";
import DateUtils from "../utils/DateUtils.js";
import Sample from "./Sample.js";

// Class that contains all the forecast array data.
export default class ForecastCollection {
  #forecast = {};
  #samples;

  constructor(data, timezoneOffset) {

    samples = data.map((day) => {
      let sample = Sample.fromOpenWeatherMap(day, timezoneOffset);
      sample.date = new DateUtils(sample.getLocalHour()); 
      return sample;
    });

    this.#samples = samples;

    this.#forecast = Object.groupBy(samples, (sample) => {
      return sample.date.toString();
    })

  }

  // Function that returns a Forecast object, containing all the samples for that day.
  getDayForecast(dateString) {
    let daySamples = this.#forecast[dateString] || [];

    let forecast = new Forecast(daySamples);
    if (daySamples.length > 0) {
        forecast.setDayDate(daySamples[0].date.date);
    }
    forecast.setLabel(dateString);

    return forecast;
  }
}
