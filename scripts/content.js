console.log("This is in the highligh word branch again");

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

//array to store the correct answers
let gameCategories = [];
let gameWords = [];

//import the json
fetch(url).then((response) => response.json()).then((json) => {
    for(const category of json.categories){
        gameCategories.push(category.title);

        //getting the correct answers for each category
        let setOfFour = [];
        for(const word of category.cards){
            setOfFour.push(word.content);
        }
        gameWords.push(setOfFour);
    }

    console.log(gameCategories);
    console.log(gameWords);
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
        //hintText.setAttribute("class", "Mistakes-module_mistakesContent__nlijY");
        hintText.style.textAlign = 'center';
        hintText.style.fontWeight = 'bold';
        
        //create bold hint text    
        let hint = "Hint: " + getNextHintText();
        hint.bold();
            
        hintText.innerHTML = hint;

        gameBoard.insertAdjacentElement("beforeend", hintText);
        gotPrevHint = true;
    }else{
        //DONT ADD NEW TEXT
        //instead change the old text
        const hintText = document.querySelector('[data-testid="hint-title"]');

        
            
        //check if an additional hint was requested
        if(hintText.innerHTML == hint){
            highlightWord(hintText.innerHTML);
        }else{
            hintText.innerHTML = hint;
    
        }
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
        if(!solvedCategoriesTitles.includes(gameCategories[i])){
            return gameCategories[i];
        }
    }
}

//passes in the category title and highlights a tile for one of the words
function highlightWord(categoryTitle){
    //get every card remaining on the board
    const remainingWordsElements = document.querySelectorAll('[data-testid="card-label"]');

    console.log(remainingWordsElements);

    //get the index for the solutions
    let solutionIndex = gameCategories.indexOf(categoryTitle);

    //get the string for each word
    for(const tile of remainingWordsElements){
        console.log(tile.innerText);
        if(gameWords[solutionIndex].includes(tile.innerText)){
            if(tile.style.backgroundColor != "rgb(227, 82, 82)" && tile.style.backgroundColor != "rgb(90, 89, 78)") {

                tile.style.backgroundColor = "rgb(227, 82, 82)";
                break;
            }
        }
    }
}
