import React, {useCallback, useEffect, useContext} from "react";
import { AppContext } from "../../App";
import Key from "./Key";
import '../keyboard/Keyboard.css'

//This component is used to show keyboard for game
function Keyboard() {
    const keysRow1 = ["Q","W","E","R","T","Y","U","I","O","P"];
    const keysRow2 = ["A","S", "D","F","G","H","J","K","L"];
    const keysRow3 = ["Z","X","C","V","B","N","M"];

    const {onEnter, onDelete, onSelectLetter, coloredLetters} = useContext(AppContext);
    
    //function to handle system keyboard as well
    const handleKeyboard = useCallback((event) => {
        if(event.key === "Enter") {
            onEnter();
        }
        else if(event.key === "Backspace") {
            onDelete();
        }
        else {
            keysRow1.forEach((key) => {
                if(key.toLowerCase() === event.key.toLowerCase()) {
                    onSelectLetter(key);
                }
            });

            keysRow2.forEach((key) => {
                if(key.toLowerCase() === event.key.toLowerCase()) {
                    onSelectLetter(key);
                }
            });
            keysRow3.forEach((key) => {
                if(key.toLowerCase() === event.key.toLowerCase()) {
                    onSelectLetter(key);
                }
            });
        }
    });

    //adding event listener and removing for keydown
    useEffect(() => {
        document.addEventListener("keydown", handleKeyboard);

        return () => {
            document.removeEventListener("keydown", handleKeyboard);
        }
    }, [handleKeyboard]);

    return (
        <div className="wordle-keyboard" onKeyDown={handleKeyboard}>
            <div className="row1">
                {keysRow1.map((key) => {
                    const isCorrect = coloredLetters.greenLetters !== undefined && coloredLetters.greenLetters.length > 0 && coloredLetters.greenLetters.includes(key);
                    const isAlmost = coloredLetters.yellowLetters !== undefined && coloredLetters.yellowLetters.length > 0 && coloredLetters.yellowLetters.includes(key);
                    const isIncorrect = coloredLetters.disabledLetters !== undefined && coloredLetters.disabledLetters.length > 0 && coloredLetters.disabledLetters.includes(key);
                    return <Key key={key} keyVal = {key} iscorrect={isCorrect} isalmost={isAlmost} iserror={isIncorrect}/>
                })}
            </div>
            <div className="row2">
                {keysRow2.map((key) => {
                    const isCorrect = coloredLetters.greenLetters !== undefined && coloredLetters.greenLetters.length > 0 && coloredLetters.greenLetters.includes(key);
                    const isAlmost = coloredLetters.yellowLetters !== undefined && coloredLetters.yellowLetters.length > 0 && coloredLetters.yellowLetters.includes(key);
                    const isIncorrect = coloredLetters.disabledLetters !== undefined && coloredLetters.disabledLetters.length > 0 && coloredLetters.disabledLetters.includes(key);
                    return <Key key={key} keyVal = {key} iscorrect={isCorrect} isalmost={isAlmost} iserror={isIncorrect}/>
                })}
            </div>
            <div className="row3">
                <Key key={"ENTER"} keyVal={"ENTER"} bigKey/>
                {keysRow3.map((key) => {
                    const isCorrect = coloredLetters.greenLetters !== undefined && coloredLetters.greenLetters.length > 0 && coloredLetters.greenLetters.includes(key);
                    const isAlmost = coloredLetters.yellowLetters !== undefined && coloredLetters.yellowLetters.length > 0 && coloredLetters.yellowLetters.includes(key);
                    const isIncorrect = coloredLetters.disabledLetters !== undefined && coloredLetters.disabledLetters.length > 0 && coloredLetters.disabledLetters.includes(key);
                    return <Key key={key} keyVal = {key} iscorrect={isCorrect} isalmost={isAlmost} iserror={isIncorrect}/>
                })}
                <Key key={"DELETE"} keyVal={"DELETE"} bigKey/> 
            </div>
        </div>
    )
}

export default Keyboard