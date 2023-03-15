import React, { useContext } from "react";
import { AppContext } from "../App";

export default function handleDelete() {
    const {gameError, setGameError, currentAttempt, setCurrentAttempt, gameBoard, setGameBoard} = useContext(AppContext);
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