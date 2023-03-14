import React, { useContext } from "react";
import { Alert } from "react-bootstrap";
import { AppContext } from "../../App";

function GameError() {
    const {gameError} = useContext(AppContext);
    return (
        <Alert key={'danger'} variant={"danger"}>{gameError.errorMsg}</Alert>
    )
}

export default GameError;