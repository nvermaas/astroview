import React from 'react';
import '../App.css';

import { Container, Jumbotron, Row, Col } from 'react-bootstrap';

import { NavigationBar } from './NavigationBar';

import { Home } from './Home';
import { Observations } from './Observations';
import { Dataproducts } from './Dataproducts';
import { About } from './About';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

// This site has multiple pages, all of which are rendered
// dynamically in the browser (not server rendered).
//
// Although the page does not ever refresh, notice how
// React Router keeps the URL up to date as you navigate
// through the site. This preserves the browser history,
// making sure things like the back button and bookmarks
// work properly.

function Main () {
    return (
        <Router>
            <div>
                <NavigationBar/>

                {/*
                 A <Switch> looks through all its children <Route>
                 elements and renders the first one whose path
                 matches the current URL. Use a <Switch> any time
                 you have multiple routes, but you want only one
                 of them to render at a time
                 */}

                <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route path="/observations">
                        <Observations />
                    </Route>
                    <Route path="/dataproducts">
                        <Dataproducts />
                    </Route>
                    <Route path="/about">
                        <About />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}


export default Main;