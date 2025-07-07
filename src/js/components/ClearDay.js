  // Clear the HTML of the current day details
  export default function ClearDay() {
    let emptyDiv = document.createElement("div");
    emptyDiv.setAttribute("id", "current-day");

    return emptyDiv;
  }