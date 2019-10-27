import React from 'react';

import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';
import logo from '../logo.ico';

export function NavigationBar() {
    return (
        <Navbar bg="dark" variant="dark">
            <img alt='' src={logo} width="30" height="30" className="d-inline-block align-top"/>

            <Navbar.Brand href="/">&nbsp;AstroView</Navbar.Brand>
            <Nav className="mr-auto">
                <Nav.Link href="/observations">Observations</Nav.Link>
                <Nav.Link href="/dataproducts">Dataproducts</Nav.Link>
                <Nav.Link href="/about">About</Nav.Link>
            </Nav>
            <Form inline>
                <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                <Button variant="outline-info">Search</Button>
            </Form>
        </Navbar>

    );
}