import React, {useCallback, useEffect, useContext, useMemo } from "react";
import { AppContext } from "../../App";
import Key from "./Key";
import '../keyboard/Keyboard.css'

//fuction to create rows for keyboard
function KeyRow({keys, coloredLetters}) {
    const keysWithColor = keys.map(key => {
        const { greenLetters = new Set(), yellowLetters = new Set(), disabledLetters = new Set() } = coloredLetters;
        const isCorrect = greenLetters.has(key);
        const isAlmost = yellowLetters.has(key);
        const isIncorrect = disabledLetters.has(key);
        if(key === "DELETE"){
            return <Key key={"DELETE"} keyVal={"DELETE"} bigKey/>;
        }
        else if(key === "ENTER") {
            return <Key key={"ENTER"} keyVal={"ENTER"} bigKey/>
        }
        else {
            return <Key key={key} keyVal={key} iscorrect={isCorrect} isalmost={isAlmost} iserror={isIncorrect} />;
        }
    });
    return <div className="keyboard-row">{keysWithColor}</div>;
}

//This component is used to show keyboard for game
function Keyboard() {
    const keysRow1 = ["Q","W","E","R","T","Y","U","I","O","P"];
    const keysRow2 = ["A","S", "D","F","G","H","J","K","L"];
    const keysRow3 = ["DELETE","Z","X","C","V","B","N","M","ENTER"];

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
            [keysRow1, keysRow2, keysRow3].forEach(keys => {
                keys.forEach(key => {
                    if(key !== "DELETE" || key !== "ENTER") {
                        if(key.toLowerCase() === event.key.toLowerCase()) {
                            onSelectLetter(key);
                        }
                    }
                });
            });
        }
    }, [onDelete, onEnter, onSelectLetter]);

    //adding event listener and removing for keydown
    useEffect(() => {
        document.addEventListener("keydown", handleKeyboard);

        return () => {
            document.removeEventListener("keydown", handleKeyboard);
        }
    }, [handleKeyboard]);

    const memoizedKeysRow1 = useMemo(() => <KeyRow keys={keysRow1} coloredLetters={coloredLetters} />, [coloredLetters, keysRow1]);
    const memoizedKeysRow2 = useMemo(() => <KeyRow keys={keysRow2} coloredLetters={coloredLetters} />, [coloredLetters, keysRow2]);
    const memoizedKeysRow3 = useMemo(() => <KeyRow keys={keysRow3} coloredLetters={coloredLetters} />, [coloredLetters, keysRow3]);
    
    return (
        <div className="wordle-keyboard" onKeyDown={handleKeyboard}>
          {memoizedKeysRow1}
          {memoizedKeysRow2}
          {memoizedKeysRow3}
        </div>
    );
}

export default Keyboard