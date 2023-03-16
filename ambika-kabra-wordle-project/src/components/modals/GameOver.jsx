import React, { useContext } from "react";
import { Button, Alert } from "react-bootstrap";
import { AppContext } from "../../context/GameState";
import { Link } from 'react-router-dom';

//This component is used to represent game over view after word found or all attempts
function GameOver() {
    const { state, dispatch } = useContext(AppContext);

    const handleReset = () => {
        dispatch({type: 'SET_GAME_RESET', payload: true});
    }
    return (
            <Alert show={state.gameOver.gameOver} variant={state.gameOver.guessedWord ? "success" : "danger"}>
            <Alert.Heading>Game Over!</Alert.Heading>
            <div className="gameover">
                <h4>{state.gameOver.guessedWord ? "You correctly guessed the word": "You failed !"}</h4>
                <h2>Correct word is : {state.gameWord}</h2>
                {state.gameOver.guessedWord && (<h3>You  guessed in {state.currentAttempt.attempt} attempts.</h3>)}
            </div>
            <p>{state.gameOver.guessedWord && "Congratulations! "} Would you like to try again?</p>
            <Link to={"/game/"+state.gameDifficulty}>
                <Button variant="outline-dark" onClick={handleReset} className="margin-top-1rem margin-left-1rem">
                   Retry
                </Button>
            </Link>
        </Alert>
    )
}

export default GameOver;