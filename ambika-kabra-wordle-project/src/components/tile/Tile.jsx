import React, { useContext, useEffect } from "react";
import { AppContext } from "../../App";
import '../tile/Tile.css'
function Tile({attemptedValue, letterPosition}) {
    const {gameBoard, gameWord, currentAttempt, coloredLetters, setColoredLetters} = useContext(AppContext);
    const currLetter = gameBoard[attemptedValue][letterPosition];
    const isCorrect = gameWord[letterPosition] === currLetter;
    const isAlmost = !isCorrect && currLetter !== "" && gameWord.includes(currLetter);
    const letterState = currentAttempt.attempt > attemptedValue && (isCorrect ? "correct" : isAlmost ? "almost" : "incorrect");
    
    useEffect(() => {
            let disabledLetterArr = coloredLetters.disabledLetters;
            let greenLetterArr = coloredLetters.greenLetters;
            let yellowLetterArr = coloredLetters.yellowLetters;
            if(currLetter !== "" && currentAttempt.attempt > attemptedValue) {
                if(isCorrect) {
                    if(!greenLetterArr.includes(currLetter))
                        greenLetterArr = greenLetterArr.push(currLetter);
                }
                else if(isAlmost) {
                    if(!yellowLetterArr.includes(currLetter))
                        yellowLetterArr = yellowLetterArr.push(currLetter);
                }
                else {
                    if(!disabledLetterArr.includes(currLetter))
                        disabledLetterArr = disabledLetterArr.push(currLetter);
                }
            }
            setColoredLetters({disabledLetters: disabledLetterArr, greenLetters: greenLetterArr, yellowLetters: yellowLetterArr});
         
    }, [currentAttempt.attempt]);

    return(
        <div className={"letter-tile " + (currentAttempt.attempt > attemptedValue && (isCorrect ? "correct " : isAlmost ? "almost " : "incorrect "))}>{currLetter}</div>
    )
}

export default Tile