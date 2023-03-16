import React, { useContext } from "react";
import { Alert } from "react-bootstrap";
import { AppContext } from "../../context/GameState";

//This component is used to show errors on top of board like word not found or short words
function GameError() {
    const {state} = useContext(AppContext);
    return (
        <Alert key={'danger'} variant={"danger"}>{state.gameError.errorMsg}</Alert>
    )
}

export default GameError;