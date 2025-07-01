// Class that contains all the forecast array data.
export class ForecastCollection {
  #forecast = {};

  constructor(forecast, timezoneOffset) {
    this.#forecast = Object.groupBy(forecast, groupByFullDate);
    this.timezoneOffset = timezoneOffset;
  }

  // Function that returns a Forecast object, containing all the samples for that day.
  getDayForecast(dateString) {
    return new Forecast(this.#forecast[dateString] || [], this.timezoneOffset);
  }
}
