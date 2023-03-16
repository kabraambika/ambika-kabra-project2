import Navbar from 'react-bootstrap/Navbar'
import { Container } from "react-bootstrap"
import Nav from 'react-bootstrap/Nav'
import { Link } from 'react-router-dom'
//This component is used to show navigation bar on top of this app having project name and two menus, how to play and home
function NavigationBar() {
    return (
        <Navbar collapseOnSelect sticky="top" expand="lg" bg="dark" variant="dark">
        <Container>
            <Navbar.Brand href="/">Wordle</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                    <Link to={"/"}>
                        <Nav.Link href="/">Home</Nav.Link>
                    </Link>
                    <Link to={"/instructions"}>
                        <Nav.Link href="/instructions">
                            How to play
                        </Nav.Link>
                    </Link>
                    
                    
                </Nav>
            </Navbar.Collapse>
        </Container>
        </Navbar>
    )
}

export default NavigationBar