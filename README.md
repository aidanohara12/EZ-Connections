# EZConnections
## Created by Aidan O'Hara and Dylan Sparkenbaugh

## Purpose of Project
The purpose of this project is to give users a seamless way to get help on the New York Times Connections Game. This chrome extension gives users a way to ask for hints as they solve the puzzle. After clicking the hint button for the first time, there will be a hint created that gives the user the title of the easiest category. After the first hint is given, if the user still cannot figure out the correct tiles, our program highlights a correct tile for the corresponding category.

## How the Project is Implemented
The extension uses the NYT API for the Connections game to load in the correct solutions for the current puzzle. Using this, the extension will automatically update which categories the user has already solved and, when prompted, can assist the user with finding the remaining categories. These changes are automatically injected into the website, meaning that the user will not have to leave their game if they think help is needed. As these hints are used, new ones can be generated that will be most useful to the user.

## Demonstration of How the Extension Works

Once the extension is installed and the user is on the NYT Connections Game, a hint button will appear, as shown below.

![Hint Button](images/HintButton.png) 

After clicking this hint button the user is given a hint in the form of the title to the easiest missing category.

![Hint Demo](images/HintDemo.png)

If the user is still having trouble they can click the hint button again and it will highlight a tile that is contained in the category they have a hint for. 

![Red Hint Demo](images/RedHintDemo.png)

Using all of these hints the user can now easily complete the Connections while having fun along the way!
