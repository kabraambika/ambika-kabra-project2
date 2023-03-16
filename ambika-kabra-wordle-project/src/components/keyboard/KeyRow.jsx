import React from "react";
import Key from "./Key";

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

export default KeyRow