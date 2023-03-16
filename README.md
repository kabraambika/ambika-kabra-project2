# ambika-kabra-project2

## Project 2: Wordle 
Wordle is a word game that challenges to figure out a word within only a certain number of guesses.
When a user opens up the app, user will see a title screen with links to play the game and a link to the game rules.
In Wordle, the game secretly chooses a random word that the user will try to guess within a certain number of attempts.  Both the length of the word and the number of attempts are based on the difficulty selected by the user. On the game page, users should have a prompt to input a word that is the length defined by the difficulty level.
Currently this game has normal and hard difficulty level. In a normal game, the user will have to find 6 letter words and be given only 6 opportunities. A hard game will use 7 letter words and only have 5 opportunities to answer.

## How to run this application in VS code
Run these three commands and project will run successfully.
```shell
cd ambika-kabra-wordle-project
npm install
npm run dev
```

## Hosted link for this project
- https://ambika-kabra-project2.onrender.com/ 

### Write up
- What were some challenges you faced while making this app?
    - Working with React hooks, especially useReducer and updating state use this hook.
    - While creating keyboard feature, Major challenge was to color keys as well along with board. 
- Given more time, what additional features, functional or design changes would you make.
    - Storing past scores and mantaining scoreboard for single user.
    - Implementing login via google or account will help in showing scoreboard.
- What assumptions did you make while working on this assignment?
    - Assuming if user enters URL apart from below mentioned links will be redirected to homepage.     
        - https://ambika-kabra-project2.onrender.com/ for homepage
        - https://ambika-kabra-project2.onrender.com/instructions for instructions
        - https://ambika-kabra-project2.onrender.com/game/normal and https://ambika-kabra-project2.onrender.com/game/hard 
    - I am validating each word with scrabbleDictionary file present in project. There can be word missing in file which exists in real world. Also random word is chosen for normal mode from 6letterWordBank.txt and for hard mode 7LetterWordBank.txt. refer [6letterWordBank.txt](ambika-kabra-wordle-project/src/assets/wordbank/6letterWordBank.txt), [7letterWordBank.txt](ambika-kabra-wordle-project/src/assets/wordbank/7letterWordBank.txt), [scrabbleDictionary.txt](ambika-kabra-wordle-project/src/assets/wordbank/scrabbleDictionary.txt)
    - While asking user to retry, I am assuming that user will play in same difficulty.
    - I am assuming that user will create words using english letters only.
    
- How long did this assignment take to complete?
    - Approx. 2 days

### Contributor
- Ambika Kabra, kabra.am@northeastern.edu

### Bonus points attempted
- Early submission - 3pts
- Valid word checks - 2pts