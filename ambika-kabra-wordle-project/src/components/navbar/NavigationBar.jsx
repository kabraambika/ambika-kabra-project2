import { Container } from "react-bootstrap";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

//This component is used to show navigation bar on top of this app having project name and two menus, how to play and home
function NavigationBar() {
    return (
        <Navbar collapseOnSelect sticky="top" expand="lg" bg="dark" variant="dark">
        <Container>
            <Navbar.Brand href="/">Wordle</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/instructions">How to play</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Container>
        </Navbar>
    )
}

export default NavigationBar