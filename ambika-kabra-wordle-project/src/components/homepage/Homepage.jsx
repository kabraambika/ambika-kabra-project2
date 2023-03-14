import React from "react";
import { Container, Button } from "react-bootstrap"
import Image from 'react-bootstrap/Image'
import { Link } from 'react-router-dom';
import '../homepage/Homepage.css'

function Homepage() {
    return (
        <div className="container">
            <div className="homepage-container">
                <Image fluid roundedCircle src="/src/assets/wordle-icon.png"/>
                <h1>Wordle</h1>
                <Container className="d-flex flex-row flex-wrap align-items-center justify-content-center">
                    <Link to={"/instructions"}>
                        <Button variant="outline-primary" className="margin-top-1rem margin-left-1rem">
                            How to play
                        </Button>
                    </Link>
                    <Link to={"/game/normal"}>
                        <Button variant="outline-dark" className="margin-top-1rem margin-left-1rem">
                            Normal mode
                        </Button>
                    </Link>
                    <Link to={"/game/hard"}>
                        <Button variant="outline-dark" className="margin-top-1rem margin-left-1rem">
                            Hard mode
                        </Button>
                    </Link>
                </Container>
            </div>
        </div>
    )
}

export default Homepage;