import React, { useContext, useEffect, useMemo } from "react";
import { AppContext } from "../../App";
import '../tile/Tile.css'

//This Tile component is child of board component which represents each letter
function Tile({attemptedValue, letterPosition}) {
    const {gameBoard, gameWord, currentAttempt, coloredLetters, setColoredLetters, gameError} = useContext(AppContext);
    const currLetter = gameBoard[attemptedValue][letterPosition];
    
    const isCorrect = useMemo(() => gameWord[letterPosition] === currLetter, [
        currLetter,
        gameWord,
        letterPosition,
    ]);

    const isAlmost = useMemo(
        () => !isCorrect && currLetter !== "" && gameWord.includes(currLetter),
        [currLetter, gameWord, isCorrect]
    );

    useEffect(() => {
        let { disabledLetters, greenLetters, yellowLetters } = coloredLetters;
        const { attempt } = currentAttempt ?? {};
        if (currLetter !== "" && attempt > attemptedValue) {
          if (isCorrect) {
            if (!greenLetters.has(currLetter)) {
              greenLetters = [...greenLetters, currLetter];
            }
          } else if (isAlmost) {
            if (!yellowLetters.has(currLetter)) {
              yellowLetters = [...yellowLetters, currLetter];
            }
          } else {
            if (!disabledLetters.has(currLetter)) {
              disabledLetters = [...disabledLetters, currLetter];
            }
          }
          setColoredLetters((prevState) => ({
            ...prevState,
            disabledLetters: new Set([...prevState.disabledLetters, ...disabledLetters]),
            greenLetters: new Set([...prevState.greenLetters, ...greenLetters]),
            yellowLetters: new Set([...prevState.yellowLetters, ...yellowLetters])
          }));
        }
    }, [currentAttempt?.attempt]);

    let letterStatus = "";

    if(currentAttempt.attempt > attemptedValue) {
        letterStatus = isCorrect ? "correct flip" : isAlmost ? "almost flip" : "incorrect flip";
    }
    
    const errorStatus = (gameError.isError && currLetter !== "") ? "shake" : "";

    return(
        <div className={"letter-tile " + (errorStatus) + (letterStatus)}>{currLetter}</div>
    )
}

export default Tile