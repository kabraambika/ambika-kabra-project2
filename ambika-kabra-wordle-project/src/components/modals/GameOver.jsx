import React, { useContext } from "react";
import { Button, Alert } from "react-bootstrap";
import { AppContext } from "../../App";
import { Link } from 'react-router-dom';

//This component is used to represent game over view after word found or all attempts
function GameOver() {
    const { gameOver, gameWord, currentAttempt, gameDifficulty, setGameReset } = useContext(AppContext);

    const handleReset = () => {
        setGameReset(true);
    }
    return (
            <Alert show={gameOver.gameOver} variant={gameOver.guessedWord ? "success" : "danger"}>
            <Alert.Heading>Game Over!</Alert.Heading>
            <div className="gameover">
                <h4>{gameOver.guessedWord ? "You correctly guessed the word": "You failed !"}</h4>
                <h2>Correct word is : {gameWord}</h2>
                {gameOver.guessedWord && (<h3>You  guessed in {currentAttempt.attempt} attempts.</h3>)}
            </div>
            <p>{gameOver.guessedWord && "Congratulations! "} Would you like to try again?</p>
            <Link to={"/game/"+gameDifficulty}>
                <Button variant="outline-dark" onClick={handleReset} className="margin-top-1rem margin-left-1rem">
                   Retry
                </Button>
            </Link>
        </Alert>
    )
}

export default GameOver;