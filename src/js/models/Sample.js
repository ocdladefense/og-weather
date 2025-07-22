
export default class Sample {

    sample;
    
    dt;
    localHour;

    temp;
    wind;
    humidity;
    pressure;
    description;
    icon;
    


    constructor(sample, timezoneOffset = 0){
        this.sample = sample;

        this.timezoneOffset = timezoneOffset;

    }

    getDateTime(){
        return this.dt;
    }

    getLocalHour() {
        return this.localHour;
    }
    
    getTemperature(){
        return this.temp;
    }

    getWind() {
        return this.wind;
    }

    getHumidity() {
        return this.humidity;
    }

    getPressure(){
        return this.pressure;
    }

    getDescription(){
        return this.description;
    }

    getIcon(){
        return this.icon;
    }

    static fromOpenWeatherMap(data, timezoneOffset = 0){
        let sample = new Sample(data, timezoneOffset);
        sample.dt = data.dt ?? null;
        sample.temp = data.main.temp ?? null;
        sample.wind = data.wind.speed ?? null;
        sample.humidity = data.main.humidity ?? null;
        sample.pressure = data.main.pressure ?? null;
        sample.description = data.weather?.[0]?.description ?? "";
        sample.icon = data.weather?.[0]?.icon ?? "";

        sample.localHour = new Date((sample.dt + timezoneOffset) * 1000);

        return sample;
    }
}