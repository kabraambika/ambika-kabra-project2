import React, { useContext, useMemo } from "react";
import { AppContext } from "../../context/GameState";
import '../tile/Tile.css'
import { useColoredLetters } from "../../lib/GameLogic";

//This Tile component is child of board component which represents each letter
function Tile({attemptedValue, letterPosition}) {
    const {state, dispatch} = useContext(AppContext);
    const currLetter = state.gameBoard[attemptedValue][letterPosition];
    
    const isCorrect = useMemo(() => state.gameWord[letterPosition] === currLetter, [
        currLetter,
        state.gameWord,
        letterPosition,
    ]);

    const isAlmost = useMemo(
        () => !isCorrect && currLetter !== "" && state.gameWord.includes(currLetter),
        [currLetter, state.gameWord, isCorrect]
    );
    
    //useEffect on every attempt
    useColoredLetters(state.coloredLetters, state.currentAttempt, attemptedValue, currLetter, isCorrect, isAlmost, dispatch);
    
    let letterStatus = "";

    if(state.currentAttempt.attempt > attemptedValue && currLetter !== undefined && currLetter.length !== 0) {
        letterStatus = isCorrect ? "correct flip" : isAlmost ? "almost flip" : "incorrect flip";
    }
    
    const errorStatus = (state.gameError.isError && currLetter !== undefined && currLetter.length !== 0) ? "shake" : "";

    return(
        <div className={"letter-tile " + (errorStatus) + (letterStatus)}>{currLetter}</div>
    )
}

export default Tile