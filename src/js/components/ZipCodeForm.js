

let previousListener = null;

export default function ZipCodeForm({ onSubmit }) {

    let formDiv = document.createElement("div");
    formDiv.setAttribute("class", "zip-form")
    
    let zipForm = document.createElement("form");
    zipForm.setAttribute("id", "zip-code-form");

    let flexDiv = document.createElement("div");
    flexDiv.setAttribute("class", "flex-parent")
  
    let label = document.createElement("label");
    label.setAttribute("for", "zipcode");
    label.textContent = "Zip";

    let input = document.createElement("input");
    input.setAttribute("class","form-control");
    input.setAttribute("type", "input");
    input.setAttribute("id", "zipcode");
    input.setAttribute("name", "zipcode");
    input.setAttribute("value", " ");
    input.required = true;

    let button = document.createElement("button");
    button.setAttribute("type", "submit");
    button.setAttribute("class", "btn btn-success");
    button.textContent = "Get the forcast!";

    zipForm.appendChild(flexDiv);
    zipForm.appendChild(label);
    zipForm.appendChild(input);
    zipForm.appendChild(button);
    formDiv.appendChild(zipForm);

    let currentForm = zipForm; // use zipForm directly since it's newly created

    // Only add the event listener if it's different
    if (previousListener !== onSubmit) {
        if (previousListener) {
            currentForm.removeEventListener("submit", previousListener);
        }
        currentForm.addEventListener("submit", onSubmit);
        previousListener = onSubmit; // store it
    }

    return formDiv;

    }