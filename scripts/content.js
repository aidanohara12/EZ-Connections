//get the current date for accessing the connections data
const date = new Date();

//seperate out the year day and month
const dd = String(date.getDate()).padStart(2, '0');
const mm = String(date.getMonth() + 1).padStart(2, '0');
const yyyy = date.getFullYear();

//string for the json url
let urlDate = yyyy + '-' + mm + '-' + dd;

//get the json for the current day
let url = "https://www.nytimes.com/svc/connections/v2/" + urlDate + ".json";

//array to store the category titles
let gameCategories = [];

//import the json
fetch(url).then((response) => response.json()).then((json) => {
    for(const category of json.categories){
        gameCategories.push(category.title);
    }
});

//add the hint button to the webpage
const buttonRow = document.getElementByClass("Board-module_boardActionGroup__mUDT8")
const hintButton = document.createElement("button");
hintButton.classList.add("ActionButton-module_button__IlhXt ");
hintButton.style.background-color = "rgb(255, 255, 255)";
hintButton.style.color = "rgb(127, 127, 127)";
hintButton.style.border-color = "rgb(127, 127, 127)";
hintButton.innerHTML = "Hint";
rowButton.insertAdjacentElement("beforeend", hintButton);
