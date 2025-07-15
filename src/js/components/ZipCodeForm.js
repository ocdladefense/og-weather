

let previousListener = null;

export default function ZipCodeForm({ onSubmit, zipcode }) {

    let formDiv = document.createElement("div");
    formDiv.setAttribute("class", "zip-form")
    
    let zipForm = document.createElement("form");
    zipForm.setAttribute("id", "zip-code-form");

    let flex = document.createElement("div");
    flex.setAttribute("class", "flex-parent")

    let label = document.createElement("label");
    label.setAttribute("for", "zipcode");
    label.textContent = "Zip";

    let input = document.createElement("input");
    input.setAttribute("class","form-control");
    input.setAttribute("type", "input");
    input.setAttribute("id", "zipcode");
    input.setAttribute("name", "zipcode");
    input.setAttribute("value", zipcode);
    input.required = true;

    let button = document.createElement("button");
    button.setAttribute("type", "submit");
    button.setAttribute("class", "btn");
    button.textContent = "Get the forcast!";

    
    flex.appendChild(label);
    flex.appendChild(input);
    flex.appendChild(button);

    zipForm.appendChild(flex);
    formDiv.appendChild(zipForm);




    zipForm.addEventListener("submit", onSubmit);

    return formDiv;

    }