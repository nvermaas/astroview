import React from 'react';

import { Navbar, Nav } from 'react-bootstrap';
import logo from '../logo.ico';
import { useGlobalReducer } from '../Store';
import { NavLink } from "react-router-dom"

import SwitchViewButton from './SwitchViewButton'
import SearchButton from './SearchButton'

function getLink(taskid) {
    let details_link = "/details/" + taskid
    return details_link
}

// conditionally render the details link
function DetailsLink(props) {
    if (props.taskid==undefined) {
        return <Nav.Link  disabled >Details</Nav.Link>
    } else {
        return <Nav.Link as={NavLink} to={getLink(props.taskid)}>Details</Nav.Link>
    }
}

export function NavigationBar() {
    const [ my_state , my_dispatch] = useGlobalReducer()

    return (
        <Navbar bg="dark" variant="dark">

            <img alt='' src={logo} width="30" height="30" className="d-inline-block align-top"/>

            <Navbar.Brand href="/astroview">&nbsp;AstroView</Navbar.Brand>
            <Nav className="mr-auto">
                <Nav.Link as={NavLink} to="/observations">My Observations</Nav.Link>
                <DetailsLink taskid={my_state.taskid} />
                <Nav.Link as={NavLink} to="/about">About</Nav.Link>
            </Nav>
            <SwitchViewButton/>
            &nbsp;
            <SearchButton/>

        </Navbar>

    );
}