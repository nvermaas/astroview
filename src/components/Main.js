import React, {useState, useEffect }  from 'react';
import '../App.css';

import { SET_FETCHED_OBSERVATIONS, SET_STATUS, SET_TOTAL_OBSERVATIONS} from '../reducers/GlobalStateReducer';
import { ASTROBASE_URL } from '../utils/skyserver'

import { useGlobalReducer } from '../Store';

import { NavigationBar } from './NavigationBar';
import Observations from '../routes/observations/ObservationsPage';
import Projects from '../routes/projects/ProjectsPage';
import ObservationDetails from '../routes/details/ObservationDetails';
import Survey from '../routes/survey/Survey';
import { About } from '../routes/about/About';


import {
    BrowserRouter as Router,
    Switch,
    Route,
    useParams
} from "react-router-dom";

// the url to the backend
// the data is fetched at the start of the application for performance reasons,
// but also to have direct links to the details page working, like http://localhost:3000/details/090311003

// export const url = "http://localhost:8000/astrobase/observations"
export const url = ASTROBASE_URL + "observations"


// This site has multiple pages, all of which are rendered
// dynamically in the browser (not server rendered).
//
// Although the page does not ever refresh, notice how
// React Router keeps the URL up to date as you navigate
// through the site. This preserves the browser history,
// making sure things like the back button and bookmarks
// work properly.

function Main () {

    // use global state
    const [ my_state , my_dispatch] = useGlobalReducer()

    // a timer is used for a 60 second polling of the data.
    const [timer, setTimer] = useState(undefined)

    // this executes fetchObservations only once when 'dependencies array' is empty: [])
    // this executes fetchObservations every time that my_state.backend_filter changes [my_state.backend_filter])

    useEffect(() => {
            fetchObservations(url)
        },[my_state.backend_filter, my_state.observation_page]
    );

    // this executes 'setTimer' once, which refreshes the observationlist every minute
/*
    useEffect(() => {
            setTimer(setInterval(() => fetchObservations(url), 60000))

            // this function is automatically called when the component unmounts
            return function cleanup() {
                clearInterval(timer);
            }
        },[]
    );
*/

    // get the data from the api
    const fetchObservations = (url) => {
        if (my_state.status !== 'fetching')  {

            url = url + "?page=" +my_state.observation_page

            if (my_state.backend_filter!=undefined) {
                url = url + my_state.backend_filter
            }

            console.log('fetchObservations: ' + (url))
            my_dispatch({type: SET_STATUS, status: 'fetching'})

            fetch(url)
                .then(results => {
                    return results.json();
                })
                .then(data => {
                    my_dispatch({type: SET_FETCHED_OBSERVATIONS, fetched_observations: data.results})
                    my_dispatch({type: SET_TOTAL_OBSERVATIONS, total_observations: data.count})
                    my_dispatch({type: SET_STATUS, status: 'fetched'})
                })
                .catch(function () {
                    my_dispatch({type: SET_STATUS, status: 'failed'})
                    alert("fetch to " + url + " failed.");
                })
        }
    }

    return (
        <Router basename="astroview">
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
                        <Projects />
                    </Route>

                    <Route path="/projects">
                        <Projects />
                    </Route>

                    <Route path="/observations">
                        <Observations />
                    </Route>

                    <Route path="/survey">
                        <Survey />
                    </Route>

                    <Route path="/about">
                        <About />
                    </Route>

                    <Route path="/details/:id" children={<ObservationDetailsForward />} />
                </Switch>
            </div>
            <footer><small> (C) 2020 - Nico Vermaas - version 1.6 - 25 jul 2020</small></footer>
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

export default Main;