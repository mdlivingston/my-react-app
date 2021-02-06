import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function NavbarComponent()
{
    return (
        <Navbar expand="sm">
            <Navbar.Brand as={Link} to="/">
                Max's Cloud Drive
            </Navbar.Brand>
            <span style={{ flex: 1 }}></span>
            <Nav>
                <Nav.Link as={Link} to="/user">
                    Profile
                </Nav.Link>
            </Nav>
        </Navbar>
    )
}
