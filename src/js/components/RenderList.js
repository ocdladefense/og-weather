import WeatherList from "./WeatherList";  
  

let previousListener = null;


  export default function RenderList({ forecast, onSubmit }) {
    let form = document.querySelector("#zipForm");
    form.removeEventListener("submit", previousListener);
    form.addEventListener("submit", onSubmit);

    return WeatherList(forecast);
  }