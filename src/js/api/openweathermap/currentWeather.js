
import Sample from "../../models/Sample";


export default function currentWeather(data){

    let weather = new Sample(data);
    
    return weather;
}