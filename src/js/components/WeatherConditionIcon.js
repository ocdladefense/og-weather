
export default function WeatherConditionIcon({src, alt, size = "small"}) {

    let img = document.createElement("img");
    img.src = `http://openweathermap.org/img/w/${src}.png`;
    img.alt = alt;


    return img;
}