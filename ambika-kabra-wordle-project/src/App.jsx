import './App.css'
import { useParams } from 'react-router'
import { useState, useMemo, createContext, useEffect } from 'react'
import { HARD_MODE, NORMAL_MODE, NORMAL_NUM_LETTERS, HARD_NUM_LETTERS, NORMAL_CHANCES, HARD_CHANCES } from './constants/GameConstants'
import { normalBoardDefault, hardBoardDefault } from './constants/BoardUtils'
import { createDictionary, createRandomSevenLetterWord, createRandomSixLetterWord } from './services/BoardService'
import Keyboard from './components/keyboard/Keyboard'
import Board from './components/board/Board'
import GameError from './components/modals/GameError'
import GameOver from './components/modals/GameOver'

//context for state management 
export const AppContext = createContext();

//Entry point for game
function App() {
  const pathParameters = useParams();
  const [gameDifficulty, setGameDifficulty] = useState(pathParameters.difficulty);
  const [gameBoard, setGameBoard] = useState(gameDifficulty === NORMAL_MODE ? normalBoardDefault : gameDifficulty === HARD_MODE && hardBoardDefault);
  const [currentAttempt, setCurrentAttempt] = useState({attempt : 0, letterPos: 0});
  const [coloredLetters, setColoredLetters] = useState({disabledLetters: new Set(), greenLetters: new Set(), yellowLetters: new Set()});
  const [wordDictionarySet, setWordDictionarySet] = useState(new Set());
  const [gameWord, setGameWord] = useState("");
  const [gameOver, setGameOver] = useState({gameOver: false, guessedWord: false});
  const [gameError, setGameError] = useState({isError: false, errorMsg: ""});
  const [gameReset, setGameReset] = useState(false);

  //reset all states when restarting the game
  useEffect(() => {
    setGameReset(false);
    setColoredLetters({disabledLetters: new Set(), greenLetters: new Set(), yellowLetters: new Set()});
    setCurrentAttempt({attempt : 0, letterPos: 0});
    setGameOver({gameOver: false, guessedWord: false});
    
    const modBoard = gameBoard.map(row => row.fill("", 0, row.length));
    setGameBoard(modBoard);
    
    if(gameDifficulty === NORMAL_MODE) {
      createRandomSixLetterWord().then((randomWord) => {
        setGameWord(randomWord.currentWord);
      });
    }
    if(gameDifficulty === HARD_MODE) {
      createRandomSevenLetterWord().then((hardRandWord) => {
        setGameWord(hardRandWord.currentWord);
      });
    }
},[gameReset]);

  //cache all word set and get random word
  useEffect(() => {
    async function fetchWords() {
      const words = await createDictionary();
      setWordDictionarySet(words.wordSet);
      if (gameDifficulty === NORMAL_MODE) {
        const randNormalWord = await createRandomSixLetterWord();
        setGameWord(randNormalWord.currentWord);
      }
      if (gameDifficulty === HARD_MODE) {
        const hardRandWord = await createRandomSevenLetterWord();
        setGameWord(hardRandWord.currentWord);
      }
    }
    fetchWords();
  }, [gameDifficulty]);

  //on click of any letter key of keyboard
  const onSelectLetter = (keyVal) => {

    const maxNumLetters = gameDifficulty === NORMAL_MODE ? NORMAL_NUM_LETTERS : HARD_NUM_LETTERS; //the maximum number of letters allowed based on the current game difficulty
    if (currentAttempt.letterPos > maxNumLetters - 1) return; // determine if the current letter position is valid

    setGameError({isError: false, errorMsg: ""});
    setGameBoard((prevBoard) => {
      const modifiedBoard = [...prevBoard];
      modifiedBoard[currentAttempt.attempt][currentAttempt.letterPos] = keyVal;
      return modifiedBoard;
    });
    setCurrentAttempt((prevAttempt) => ({ ...prevAttempt, letterPos: prevAttempt.letterPos + 1 }));  
  } 
  
  //Function preforming enter key
  const onEnter = () => {
    const isWordTooShort = (gameDifficulty === NORMAL_MODE && currentAttempt.letterPos !== NORMAL_NUM_LETTERS) || (gameDifficulty === HARD_MODE && currentAttempt.letterPos !== HARD_NUM_LETTERS);
  
    if(isWordTooShort) {
      setGameError({isError: true, errorMsg: "Word is too short!"});
      return;
    }

    let currentWord = "";
    const numLetters = gameDifficulty === NORMAL_MODE ? NORMAL_NUM_LETTERS : HARD_NUM_LETTERS;
    
    for(let i=0; i<numLetters; i++) {
      currentWord += gameBoard[currentAttempt.attempt][i];
    }
  
    //spell check 
    if(wordDictionarySet.has(currentWord)) {
      setCurrentAttempt({attempt : currentAttempt.attempt + 1, letterPos: 0});
    }
    else {
      setGameError({isError: true, errorMsg: "Word not found! Check spelling."});
      return;
    }

    updateGameOverState(currentWord);
  }
  
  //Incase of attempts exhausted or correct word found, change state of gameOver 
  function updateGameOverState(currentWord) {
    //correct word
    if(currentWord === gameWord) {
      setGameOver({gameOver: true, guessedWord: true});
    }
    else if((gameDifficulty === NORMAL_MODE && currentAttempt.attempt === NORMAL_CHANCES-1) || (gameDifficulty === HARD_MODE && currentAttempt.attempt === HARD_CHANCES-1)) {
      setGameOver({gameOver: true, guessedWord: false});
    }
  }

  //On clicking delete key
  const onDelete = () => {
    setGameError({isError: false, errorMsg: ""});
    
    if(currentAttempt.letterPos === 0)
      return;

    const modBoard = [...gameBoard];
    modBoard[currentAttempt.attempt][currentAttempt.letterPos - 1] = "";
    setGameBoard(modBoard);
    setCurrentAttempt({...currentAttempt, letterPos: currentAttempt.letterPos - 1});
  }

  const wordleAppProviderValue = useMemo(() => ({
    gameReset, 
    setGameReset, 
    gameError, 
    setGameError,
    gameDifficulty, 
    setGameDifficulty, 
    gameBoard, 
    setGameBoard, 
    currentAttempt, 
    setCurrentAttempt, 
    coloredLetters, 
    setColoredLetters, 
    gameWord, 
    setGameWord, 
    onDelete, 
    onEnter,
     onSelectLetter, 
     gameOver, 
     setGameOver}));

  return (
    <div className="App">
      <AppContext.Provider value={ wordleAppProviderValue }>
        <div className={"app-container d-flex justify-content-center " + (gameOver.gameOver ? " game-over-container" : "")}>
          {gameError.isError && <div className='position-absolute game-error-container'><GameError/></div>}
          {gameOver.gameOver ? <div className='gameover-overlay'><GameOver/></div> : <><Board/><Keyboard/></>}
        </div>
      </AppContext.Provider>
    </div>
  )
}

export default App
