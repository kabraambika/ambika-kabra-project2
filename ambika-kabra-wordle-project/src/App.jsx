import './App.css'
import { useParams } from 'react-router'
import { useState, useMemo, createContext, useEffect } from 'react';
import { HARD_MODE, NORMAL_MODE, NORMAL_NUM_LETTERS, HARD_NUM_LETTERS } from './constants/GameConstants';
import { normalBoardDefault, hardBoardDefault } from './constants/BoardUtils';
import { createDictionary, createRandomSevenLetterWord, createRandomSixLetterWord } from './services/BoardService';
import Keyboard from './components/keyboard/Keyboard';
import Board from './components/board/Board';
import GameError from './components/modals/GameError';
import GameOver from './components/modals/GameOver';

export const AppContext = createContext();

function App() {
  const pathParameters = useParams();
  const [gameDifficulty, setGameDifficulty] = useState(pathParameters.difficulty);
  const [gameBoard, setGameBoard] = useState(gameDifficulty === NORMAL_MODE ? normalBoardDefault : gameDifficulty === HARD_MODE && hardBoardDefault);
  const [currentAttempt, setCurrentAttempt] = useState({attempt : 0, letterPos: 0});
  const [coloredLetters, setColoredLetters] = useState({disabledLetters: [], greenLetters: [], yellowLetters:[]});
  const [wordDictionarySet, setWordDictionarySet] = useState(new Set());
  const [gameWord, setGameWord] = useState("");
  const [gameOver, setGameOver] = useState({gameOver: false, guessedWord: false});
  const [gameError, setGameError] = useState({isError: false, errorMsg: ""});
  const [gameReset, setGameReset] = useState(false);

  useEffect(() => {
    setGameReset(false);
    setColoredLetters({disabledLetters: [], greenLetters: [], yellowLetters:[]});
    setCurrentAttempt({attempt : 0, letterPos: 0});
    setGameOver({gameOver: false, guessedWord: false});
    const modBoard = gameBoard;

    for (let row of modBoard) {
      row.fill("", 0, row.length);
    }
    
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

  useEffect(() => {
    createDictionary().then((words) => {
      setWordDictionarySet(words.wordSet);
    });
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
  }, []);

  const onSelectLetter = (keyVal) => {
    if((gameDifficulty === NORMAL_MODE && currentAttempt.letterPos > 5) || (gameDifficulty === HARD_MODE && currentAttempt.letterPos > 6)) 
      return;

    setGameError({isError: false, errorMsg: ""});
    const modifiedBoard = [...gameBoard];
    modifiedBoard[currentAttempt.attempt][currentAttempt.letterPos] = keyVal;
    setGameBoard(modifiedBoard);
    setCurrentAttempt({...currentAttempt, letterPos: currentAttempt.letterPos + 1});   
  } 
  
  const onEnter = () => {
    if((gameDifficulty === NORMAL_MODE && currentAttempt.letterPos !== 6) || (gameDifficulty === HARD_MODE && currentAttempt.letterPos !== 7)) {
      setGameError({isError: true, errorMsg: "word is too short!"});
      return;
    }
    
    let currentWord = "";
    if(gameDifficulty === NORMAL_MODE) {
      for(let i=0;i<NORMAL_NUM_LETTERS;i++) {
        currentWord += gameBoard[currentAttempt.attempt][i];
      }
    }
    else if(gameDifficulty === HARD_MODE) {
      for(let i=0;i<HARD_NUM_LETTERS;i++) {
        currentWord += gameBoard[currentAttempt.attempt][i];
      }
    }
  
    //spell check 
    if(wordDictionarySet.has(currentWord)) {
      setCurrentAttempt({attempt : currentAttempt.attempt + 1, letterPos: 0});
    }
    else {
      setGameError({isError: true, errorMsg: "Word not found! Check spelling."});
      return;
    }

    //correct word
    if(currentWord === gameWord) {
      setGameOver({gameOver: true, guessedWord: true});
    }
    else if(gameDifficulty === NORMAL_MODE && currentAttempt.attempt === 5) {
      setGameOver({gameOver: true, guessedWord: false});
    }
    else if (gameDifficulty === HARD_MODE && currentAttempt.attempt === 4) {
      setGameOver({gameOver: true, guessedWord: false});
    }
  }
  
  const onDelete = () => {
    if(gameError.isError) {
      setGameError({isError: false, errorMsg: ""});
    }
    if(currentAttempt.letterPos === 0)
      return;

    const modBoard = [...gameBoard];
    modBoard[currentAttempt.attempt][currentAttempt.letterPos - 1] = "";
    setGameBoard(modBoard);
    setCurrentAttempt({...currentAttempt, letterPos: currentAttempt.letterPos - 1});
  }

  const wordleAppProviderValue = useMemo(() => ({gameReset, setGameReset, gameError, setGameError, gameDifficulty, setGameDifficulty, gameBoard, setGameBoard, currentAttempt, setCurrentAttempt, coloredLetters, setColoredLetters, gameWord, setGameWord, onDelete, onEnter, onSelectLetter, gameOver, setGameOver}));

  return (
    <div className="App">
      <AppContext.Provider value={ wordleAppProviderValue }>
        <div className={"app-container d-flex justify-content-center " + (gameOver.gameOver ? " game-over-container" : "")}>
          {gameError.isError && <div className='position-absolute'><GameError/></div>}
          {gameOver.gameOver ? <div className='gameover-overlay'><GameOver/></div> : <><Board/><Keyboard/></>}
        </div>
      </AppContext.Provider>
    </div>
  )
}

export default App
