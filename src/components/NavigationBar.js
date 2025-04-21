import React from 'react';
import { Container } from 'react-bootstrap';
import { Navbar, Nav } from 'react-bootstrap';
import logo from '../assets/logo.ico';
import { useGlobalReducer } from '../contexts/GlobalContext';
import { NavLink, Link } from "react-router-dom"

import {ASTROBASE_URL, ALADIN_STARCHARTS_URL, EXOPLANETS_URL} from '../utils/skyserver'
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
    //let STARCHARTS_URL = ASTROBASE_URL + 'starchart/'
    let STARCHARTS_URL = ALADIN_STARCHARTS_URL

    let detailsLink
    if (my_state.current_task_id) {
        let taskid = my_state.current_task_id
        let link = "/details/"+taskid
        //alert(taskid)
        detailsLink=<Nav.Link as={NavLink} to={link}>{taskid}</Nav.Link>
    }

    return (

        <Navbar bg="dark" variant="dark">

            <a href={ASTROBASE_URL}>
                <img alt='' src={logo} width="30" height="30" className="d-inline-block align-top"/>
            </a>
            <Navbar.Brand href="/astroview">&nbsp;AstroView </Navbar.Brand>
            <Nav className="mr-auto">
                <Nav.Link as={NavLink} to="/projects">Projects</Nav.Link>
                <Nav.Link as={NavLink} to="/observations">Observations</Nav.Link>
                {detailsLink}
                <Nav.Link as={NavLink} to="/collections">Collections</Nav.Link>

                <Nav.Link as={NavLink} to="/aladin">SkyView</Nav.Link>
                <Nav.Link as={NavLink} to="/cutouts">Cutouts</Nav.Link>
                <Nav.Link target="_blank" href={STARCHARTS_URL}>Starcharts</Nav.Link>
                <Nav.Link target="_blank" href={EXOPLANETS_URL}>Exoplanets</Nav.Link>
                <Nav.Link target="_blank" href={ASTROBASE_URL}>AstroBase</Nav.Link>
                &nbsp;

                &nbsp;
                <Nav.Link target="_blank" href={ASTROBASE_URL_JOBS}>Jobs: {my_state.nr_of_jobs}</Nav.Link>

            </Nav>
            <Nav>
                <Nav.Link target="_blank" href={ASTROBASE_URL_ADMIN}>Admin</Nav.Link>
                <AuthControl />
            </Nav>
        </Navbar>

    );
}