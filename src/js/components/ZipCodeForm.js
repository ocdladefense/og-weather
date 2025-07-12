

let previousListener = null;

export default function ZipCodeForm({ onSubmit }) {


    let form = document.querySelector("#zipForm");
    form.removeEventListener("submit", previousListener);
    form.addEventListener("submit", onSubmit);

    /*
    let form = document.createElement("form");
    form.setAttribute("class", "zip-code-form");
    
    let input = document.createElement("input");
    input.setAttribute("type", "text");
    input.setAttribute("name", "zipcode");
    input.setAttribute("placeholder", "Enter Zip Code");
    input.required = true;
    
    let button = document.createElement("button");
    button.textContent = "Get Weather";
    
    form.appendChild(input);
    form.appendChild(button);
    
    form.addEventListener("submit", onSubmit);
    
    return form;
    */
    }