import React, {useContext} from "react";
import { AppContext } from "../../App";

//This component represents individual key of keyboard component
function Key({keyVal, bigKey, disabled, isalmost, iscorrect, iserror}) {
    //using AppContext provided in App.jsx
    const {onEnter, onDelete, onSelectLetter} = useContext(AppContext);

    //function for on click of any key
    const selectLetter = () => {
        if(keyVal === "ENTER") {
            onEnter();
        }
        else if(keyVal === "DELETE") {
            onDelete();
        }
        else {
            onSelectLetter(keyVal);
        }
    }   

    return (
        <div className={"key " + (iscorrect ? "correct " : isalmost ? "almost" : iserror ? "incorrect" : "")} id={bigKey ? "big" : disabled && "disabled"} onClick={selectLetter}>{keyVal}</div>
    )
}

export default Key