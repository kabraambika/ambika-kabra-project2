import React, { useContext } from "react";
import { Alert } from "react-bootstrap";
import { AppContext } from "../../App";

//This component is used to show errors on top of board like word not found or short words
function GameError() {
    const {gameError} = useContext(AppContext);
    return (
        <Alert key={'danger'} variant={"danger"}>{gameError.errorMsg}</Alert>
    )
}

export default GameError;