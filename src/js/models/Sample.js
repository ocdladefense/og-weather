
export default class Sample {

    sample;
    
    dt;

    temp;
    wind;
    humidity;
    pressure;
    description;
    icon;
    


    constructor(sample){
        this.sample = sample;
    }

    getDateTime(){
        return this.dt;
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

    static fromOpen(data){
        let sample = new Sample(data);
        sample.dt = data.dt ?? null;
        sample.temp = data.main.temp ?? null;
        sample.wind = data.wind.speed ?? null;
        sample.humidity = data.main.humidity ?? null;
        sample.pressure = data.main.pressure ?? null;
        sample.description = data.weather?.[0]?.description ?? "";
        sample.icon = data.weather?.[0]?.icon ?? "";

        return sample;
    }
}