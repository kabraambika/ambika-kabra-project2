import React, { createContext, useReducer, useMemo } from 'react';
import { handleDeleteFeature, handleEnterFeature, handleSelectedLetter } from '../lib/Helper';
import { normalBoardDefault } from '../constants/BoardUtils';

//AppContext available to use for components
export const AppContext = createContext();

//Defining the initial state of app
const initialState = {
  gameDifficulty: 'normal',
  gameBoard: normalBoardDefault,
  currentAttempt: { attempt: 0, letterPos: 0 },
  coloredLetters: { disabledLetters: new Set(), greenLetters: new Set(), yellowLetters: new Set() },
  wordDictionarySet: new Set(),
  gameWord: '',
  gameOver: { gameOver: false, guessedWord: false },
  gameError: { isError: false, errorMsg: '' },
  gameReset: false,
};

// Define the reducer function
const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_GAME_DIFFICULTY':
      return { ...state, gameDifficulty: action.payload };
    case 'SET_GAME_BOARD':
      return { ...state, gameBoard: action.payload };
    case 'SET_CURRENT_ATTEMPT':
      return { ...state, currentAttempt: action.payload };
    case 'SET_COLORED_LETTERS':
      return { ...state, coloredLetters: action.payload };
    case 'SET_WORD_DICTIONARY_SET':
      return { ...state, wordDictionarySet: action.payload };
    case 'SET_GAME_WORD':
      return { ...state, gameWord: action.payload };
    case 'SET_GAME_OVER':
      return { ...state, gameOver: action.payload };
    case 'SET_GAME_ERROR':
      return { ...state, gameError: action.payload };
    case 'SET_GAME_RESET':
      return { ...state, gameReset: action.payload };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

//AppProvider used in main.jsx to share state in components
export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  //On clicking delete key
  const onDelete = () => {
    handleDeleteFeature(dispatch, state.currentAttempt, state.gameBoard);
  }

  //Function preforming enter key
  const onEnter = () => {
    handleEnterFeature(state.gameDifficulty, state.currentAttempt, state.gameBoard, state.wordDictionarySet, state.gameWord, dispatch);
  }

   //on click of any letter key of keyboard
   const onSelectLetter = (keyVal) => {
    handleSelectedLetter(keyVal, state.gameDifficulty, state.currentAttempt, state.gameBoard, dispatch);
  }

  const AppContextProviderValue = useMemo(() => ({state, dispatch, onSelectLetter, onDelete, onEnter}), []);
  return (
    <AppContext.Provider value={AppContextProviderValue}>
      {children}
    </AppContext.Provider>
  );
};
