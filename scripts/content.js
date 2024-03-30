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

    console.log(gameCategories);
});

//add the hint button to the webpage
//select the existing button element
const shuffleButton = document.querySelector('[data-testid="shuffle-btn"]');

//create a new button element
const hintButton = document.createElement('button');

//set attributes for the new button
hintButton.setAttribute('type', 'button');
hintButton.setAttribute('class', 'ActionButton-module_button__IlhXt');
hintButton.setAttribute('style', 'background-color: rgb(255, 255, 255); color: rgb(0, 0, 0); border-color: rgb(0, 0, 0);');
hintButton.textContent = 'Hint';
hintButton.addEventListener("click", getHint);

//insert the new button next to the existing button
shuffleButton.parentNode.insertBefore(hintButton, shuffleButton.nextSibling);

//keep track of if the user already got a hint previously
let gotPrevHint = false;





//get the hint to be displayed to the user
function getHint(){
        if(!gotPrevHint){
        //adding the text below the mistakes
        const gameBoard = document.getElementById("pz-game-root");
        const hintText = document.createElement('h2');
        hintText.setAttribute("data-testid", "hint-title");
        hintText.setAttribute("class", "Mistakes-module_mistakesContent__nlijY");

        hintText.innerHTML = getNextHintText();

        gameBoard.insertAdjacentElement("beforeend", hintText);
        gotPrevHint = true;
    }else{
        const hintText = document.querySelector('[data-testid="hint-title"]');
        hintText.innerHTML = getNextHintText();
    }
}

function getNextHintText() {
    //check which categories the user has solved already
    const solvedCategoriesElements = document.querySelectorAll('[data-testid="solved-category-title"]');
    const solvedCategoriesTitles = [];

    //get their titles
    for(let i = 0; i < solvedCategoriesElements.length; i++){
        solvedCategoriesTitles.push(solvedCategoriesElements[i].innerHTML);
    }

    //set the hint to one of the categories the user has not already sovled
    for(let i = 0; i < gameCategories.length; i++){
        console.log(gameCategories[i]);
        if(!solvedCategoriesTitles.includes(gameCategories[i])){
            return gameCategories[i];
            break;
        }
    }
}