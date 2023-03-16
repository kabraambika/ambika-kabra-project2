import { NORMAL_MODE, NORMAL_CHANCES, HARD_MODE, HARD_CHANCES, NORMAL_NUM_LETTERS, HARD_NUM_LETTERS } from "../constants/GameConstants";

//this is a helper function used for delete key event and button for keyboard
export function handleDeleteFeature(dispatch, currentAttempt, gameBoard) {
    dispatch({type: 'SET_GAME_ERROR', payload: {isError: false, errorMsg: ""}});
    
    if(currentAttempt.letterPos === 0)
      return;

    const modBoard = [...gameBoard];
    modBoard[currentAttempt.attempt][currentAttempt.letterPos - 1] = "";
    dispatch({type: 'SET_GAME_BOARD', payload: modBoard});
    dispatch({type: 'SET_CURRENT_ATTEMPT', payload: {...currentAttempt, letterPos: currentAttempt.letterPos - 1}});
}

//this is a helper function used for enter key event and button for keyboard
export function handleEnterFeature(gameDifficulty, currentAttempt, gameBoard, wordDictionarySet, gameWord, dispatch) {
    const isWordTooShort = (gameDifficulty === NORMAL_MODE && currentAttempt.letterPos !== NORMAL_NUM_LETTERS) || (gameDifficulty === HARD_MODE && currentAttempt.letterPos !== HARD_NUM_LETTERS);
  
    if(isWordTooShort) {
      dispatch({type: 'SET_GAME_ERROR', payload: {isError: true, errorMsg: "Word is too short!"}});
      return;
    }

    let currentWord = "";
    const numLetters = gameDifficulty === NORMAL_MODE ? NORMAL_NUM_LETTERS : HARD_NUM_LETTERS;
    
    for(let i=0; i<numLetters; i++) {
      currentWord += gameBoard[currentAttempt.attempt][i];
    }
  
    //spell check 
    if(wordDictionarySet.has(currentWord)) {
      dispatch({type: 'SET_CURRENT_ATTEMPT', payload: {attempt : currentAttempt.attempt + 1, letterPos: 0}});
    }
    else {
      dispatch({type: 'SET_GAME_ERROR', payload: {isError: true, errorMsg: "Word not found! Check spelling."}});
      return;
    }

    updateGameOverState(currentWord, gameWord, gameDifficulty, currentAttempt, dispatch);
}

//Incase of attempts exhausted or correct word found, change state of gameOver 
function updateGameOverState(currentWord, gameWord, gameDifficulty, currentAttempt, dispatch) {
    if(currentWord === gameWord) {
      dispatch({type: 'SET_GAME_OVER', payload: {gameOver: true, guessedWord: true}});
    }
    else if((gameDifficulty === NORMAL_MODE && currentAttempt.attempt === NORMAL_CHANCES-1) || (gameDifficulty === HARD_MODE && currentAttempt.attempt === HARD_CHANCES-1)) {
      dispatch({type: 'SET_GAME_OVER', payload: {gameOver: true, guessedWord: false}});
    }
}

//this is a helper function used for any letter key event and button for keyboard
export function handleSelectedLetter(keyVal, gameDifficulty, currentAttempt, gameBoard, dispatch) {
    const maxNumLetters = gameDifficulty === NORMAL_MODE ? NORMAL_NUM_LETTERS : HARD_NUM_LETTERS; //the maximum number of letters allowed based on the current game difficulty
    if (currentAttempt.letterPos > maxNumLetters - 1) return; // determine if the current letter position is valid

    dispatch({type: 'SET_GAME_ERROR', payload: {isError: false, errorMsg: ""}});
    
    let modifiedBoard = gameBoard;
    modifiedBoard[currentAttempt.attempt][currentAttempt.letterPos] = keyVal;
    dispatch({type: 'SET_GAME_BOARD', payload: modifiedBoard});
    
    const modifiedAttempt = {attempt: currentAttempt.attempt, letterPos: currentAttempt.letterPos + 1};
    dispatch({type: 'SET_CURRENT_ATTEMPT', payload: modifiedAttempt});
}