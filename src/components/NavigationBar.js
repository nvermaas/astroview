import React from 'react';

import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';
import logo from '../logo.ico';
import { useGlobalReducer } from '../Store';
import { NavLink, useLocation } from "react-router-dom"


export function NavigationBar() {
    const [ my_state , my_dispatch] = useGlobalReducer()

    const getLink = (taskid) => {
        let details_link = "/details/" + taskid
        return details_link

    }

    // conditional render. Only show and activate the link when an observation has been selected before
    let renderDetails
    if (my_state.taskid==undefined) {
        renderDetails = <Nav.Link  disabled >Details</Nav.Link>
    } else {
        renderDetails = <Nav.Link as={NavLink} to={getLink(my_state.taskid)}>Details</Nav.Link>
    }

    return (
        <Navbar bg="dark" variant="dark">

            <img alt='' src={logo} width="30" height="30" className="d-inline-block align-top"/>

            <Navbar.Brand href="/astroview">&nbsp;AstroView</Navbar.Brand>
            <Nav className="mr-auto">
                <Nav.Link as={NavLink} to="/observations">My Observations</Nav.Link>
                {renderDetails}
                <Nav.Link as={NavLink} to="/about">About</Nav.Link>
            </Nav>
            <Form inline>
                <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                <Button variant="outline-info">Search</Button>
            </Form>
        </Navbar>

    );
}