import React from 'react';

import { Navbar, Nav } from 'react-bootstrap';
import logo from '../logo.ico';
import { useGlobalReducer } from '../contexts/GlobalContext';
import { NavLink, Link } from "react-router-dom"

import { ASTROBASE_URL } from '../utils/skyserver'
import SwitchViewButton from './buttons/SwitchViewButton'
import SwitchThumbnailButton from './buttons/SwitchThumbnailButton'
import SearchButton from './buttons/SearchButton'
import CoordSearchButton from './buttons/CoordSearchButton'
import AuthControl from "./auth/authControl";

function getLink(taskid) {
    let details_link = "/details/" + taskid
    return details_link
}

// conditionally render the details link
function DetailsLink(props) {
    if (props.taskid===undefined) {
        return <Nav.Link  disabled >Details</Nav.Link>
    } else {
        return <Nav.Link as={NavLink} to={getLink(props.taskid)}>Details</Nav.Link>
    }
}

export function NavigationBar() {
    const [ my_state , my_dispatch] = useGlobalReducer()
    let ASTROBASE_URL_ADMIN = ASTROBASE_URL + 'admin'
    let ASTROBASE_URL_JOBS = ASTROBASE_URL + 'admin/backend_app/job'

    return (
        <Navbar bg="dark" variant="dark">

            <a href={ASTROBASE_URL}>
                <img alt='' src={logo} width="30" height="30" className="d-inline-block align-top"/>
            </a>
            <Navbar.Brand href="/astroview">&nbsp;AstroView </Navbar.Brand>
            <Nav className="mr-auto">
                <Nav.Link as={NavLink} to="/observations">Observations</Nav.Link>
                <Nav.Link as={NavLink} to="/collections">Collections</Nav.Link>
                <Nav.Link as={NavLink} to="/projects">Parents</Nav.Link>

                <Nav.Link target="_blank" href={ASTROBASE_URL}>AstroBase</Nav.Link>
                <Nav.Link target="_blank" href={ASTROBASE_URL_ADMIN}>Admin</Nav.Link>
                <Nav.Link target="_blank" href={ASTROBASE_URL_JOBS}>Jobs: {my_state.nr_of_jobs}</Nav.Link>

            </Nav>
            <SwitchThumbnailButton/>
            &nbsp;
            <SwitchViewButton/>
            &nbsp;

            <CoordSearchButton/>
            <SearchButton/>
            <Nav>
                <AuthControl />
            </Nav>
        </Navbar>

    );
}