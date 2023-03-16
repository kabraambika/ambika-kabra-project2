import { useEffect } from 'react';
import { HARD_MODE, NORMAL_MODE } from '../constants/GameConstants';
import { createDictionary, createRandomSevenLetterWord, createRandomSixLetterWord } from '../lib/BoardService'
import { normalBoardDefault, hardBoardDefault } from '../constants/BoardUtils'

//this is a function having useEffect when gameReset changes, used in App.jsx
export function useGameReset(gameReset, gameDifficulty, gameBoard, dispatch) {
    useEffect(() => {
      dispatch({ type: 'SET_GAME_RESET', payload: false});
      dispatch({ type: 'SET_COLORED_LETTERS', payload: {disabledLetters: new Set(), greenLetters: new Set(), yellowLetters: new Set()}});
      dispatch({ type: 'SET_CURRENT_ATTEMPT', payload: {attempt : 0, letterPos: 0}});
      dispatch({ type: 'SET_GAME_OVER', payload: {gameOver: false, guessedWord: false}});

      const modBoard = gameBoard.map(row => row.fill("", 0, row.length));
      dispatch({ type: 'SET_GAME_BOARD', payload: modBoard});

      if(gameDifficulty === NORMAL_MODE) {
          createRandomSixLetterWord().then((randomWord) => {
            dispatch({ type: 'SET_GAME_WORD', payload: randomWord.currentWord});
          });
      }
      if(gameDifficulty === HARD_MODE) {
          createRandomSevenLetterWord().then((hardRandWord) => {
            dispatch({ type: 'SET_GAME_WORD', payload: hardRandWord.currentWord});
          });
      }
    },[gameReset]);
}

//this is a function having useEffect when gameDifficulty changes, used in App.jsx
export function useWordSet(gameDifficulty, dispatch) {
    useEffect(() => {
    async function fetchWords() {
        const words = await createDictionary();
        dispatch({ type: 'SET_WORD_DICTIONARY_SET', payload: words.wordSet});
        if (gameDifficulty === NORMAL_MODE) {
            const randNormalWord = await createRandomSixLetterWord();
            dispatch({ type: 'SET_GAME_WORD', payload: randNormalWord.currentWord});
        }
        if (gameDifficulty === HARD_MODE) {
            const hardRandWord = await createRandomSevenLetterWord();
            dispatch({ type: 'SET_GAME_WORD', payload: hardRandWord.currentWord});
        }
    }
    fetchWords();
  }, [gameDifficulty]);
}

//this is a function having useEffect when difficulty changes, used in App.jsx
export function useGameDifficulty(difficulty, dispatch) {
    useEffect(() => {
        dispatch({ type: 'SET_GAME_DIFFICULTY', payload: difficulty});
        const currBoard = difficulty === NORMAL_MODE ? normalBoardDefault : difficulty === HARD_MODE && hardBoardDefault;
        dispatch({ type: 'SET_GAME_BOARD', payload: currBoard});
    }, [difficulty]);
}

//this is a function having useEffect when currentAttempt.attempt value changes, used in Tile.jsx
export function useColoredLetters(coloredLetters, currentAttempt, attemptedValue, currLetter, isCorrect, isAlmost, dispatch) {
    useEffect(() => {
        let { disabledLetters, greenLetters, yellowLetters } = coloredLetters;
        const { attempt } = currentAttempt ?? {};
        if (currLetter !== "" && attempt > attemptedValue) {
          if (isCorrect) {
            if (!greenLetters.has(currLetter)) {
              greenLetters.add(currLetter);
            }
          } else if (isAlmost) {
            if (!yellowLetters.has(currLetter)) {
              yellowLetters.add(currLetter);
            }
          } else {
            if (!disabledLetters.has(currLetter)) {
              disabledLetters.add(currLetter);
            }
          }
          let modifiedColoredLetters = {disabledLetters: new Set(disabledLetters), greenLetters: new Set(greenLetters), yellowLetters: new Set(yellowLetters)};
          
          dispatch({type: 'SET_COLORED_LETTERS', payload: modifiedColoredLetters});
        }
    }, [currentAttempt?.attempt]);
}