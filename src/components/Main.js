import React from 'react';
import '../App.css';

import { NavigationBar } from './NavigationBar';

import { Home } from './Home';
import Observations from './ObservationsPage';
import ObservationDetails from './ObservationDetails';
import Dataproducts from './Dataproducts';
import { About } from './About';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    useParams
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

                    <Route path="/about">
                        <About />
                    </Route>

                    <Route path="/details/:id" children={<ObservationDetailsForward />} />
                </Switch>
            </div>
            <footer><small> (C) 2019 - Nico Vermaas - version 1.0.0 - 27 oct 2019</small></footer>
        </Router>
    );
}

// reroute to dataproduct details
function ObservationDetailsForward() {
    let { id } = useParams();
    return (
        <ObservationDetails taskid={id}/>
    );
}

function Child() {
    // We can use the `useParams` hook here to access
    // the dynamic pieces of the URL.
    let { id } = useParams();

    return (
        <div>
            <h4>ID: {id}</h4>
        </div>
    );
}

export default Main;