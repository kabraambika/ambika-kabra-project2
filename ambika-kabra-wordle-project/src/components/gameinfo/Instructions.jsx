import React from "react";
import { Container } from "react-bootstrap"
import '../gameinfo/Instructions.css'

//This component is used to represent how to play page
function Instructions() {
    return (
        <Container className="instructions-container d-flex flex-column justify-content-center">
            <h2>How to play</h2>
            <div>
                <h5>Guess the word in given tries.</h5>
                <ul>
                    <li>Each guess must be a valid word.</li>
                    <li>The color of the tiles will change to show how close your guess was to the word.</li>
                </ul>
                <p>
                    The length of the word and number of attempts allowed varies based on difficulty selected as follows:
                </p>
                <ul>
                    <li><strong>Normal</strong>: 6 letter words, 6 guess opportunities</li>
                    <li><strong>Hard</strong>: 7 letter words, 5 guess opportunities</li>
                </ul>
            </div>
            <h5>Examples</h5>
            <div className="tile-container">
                <div className="tile correct">W</div>
                <div className="tile">E</div>
                <div className="tile">A</div>
                <div className="tile">R</div>
                <div className="tile">Y</div>
            </div>
            <p><strong>W</strong> is in the word and in the correct spot.</p>
            <div className="tile-container">
                <div className="tile">P</div>
                <div className="tile almost">I</div>
                <div className="tile">L</div>
                <div className="tile">L</div>
                <div className="tile">S</div>
            </div>
            <p><strong>I</strong> is in the word but in the wrong spot.</p>
            <div className="tile-container">
                <div className="tile">V</div>
                <div className="tile">A</div>
                <div className="tile">G</div>
                <div className="tile incorrect">U</div>
                <div className="tile">E</div>
            </div>
            <p><strong>U</strong> is not in the word in any spot.</p>
        </Container>
    )
}

export default Instructions