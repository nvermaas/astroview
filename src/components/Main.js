import React, {useState, useEffect }  from 'react';
import '../App.css';

import {
    SET_FETCHED_OBSERVATIONS,
    SET_STATUS,
    SET_TOTAL_OBSERVATIONS,
    SET_FETCHED_PROJECTS,
    SET_STATUS_PROJECTS,
    SET_TOTAL_PROJECTS,
    SET_BACKEND_FILTER
} from '../reducers/GlobalStateReducer';

import { ASTROBASE_URL } from '../utils/skyserver'
import { getFilteredUrl } from '../utils/filter'

import { useGlobalReducer } from '../Store';

import { NavigationBar } from './NavigationBar';
import { ButtonBar } from '../components/ButtonBar';
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

// the url_observations to the backend
// the data is fetched at the start of the application for performance reasons,
// but also to have direct links to the details page working, like http://localhost:3000/details/090311003

// export const url_observations = "http://localhost:8000/astrobase/observations"
export const url_observations = ASTROBASE_URL + "observations"
export const url_projects = ASTROBASE_URL + "projects"


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

    // this executes fetchObservations every time that my_state.backend_filter changes [my_state.backend_filter])
    useEffect(() => {
            fetchObservations(url_observations)
        }, [my_state.backend_filter,
            my_state.observation_page,
            my_state.observation_quality,
            my_state.observation_status,
            my_state.observation_iso,
            my_state.observation_focal_length,
            my_state.observation_image_type]
    );

    // this executes fetchObservations every time that my_state.backend_filter changes [my_state.backend_filter])

    useEffect(() => {
            fetchProjects(url_projects)
        }, [my_state.backend_filter,
            my_state.observation_page,
            my_state.observation_quality,
            my_state.observation_status,
            my_state.observation_iso,
            my_state.observation_focal_length,
            my_state.observation_image_type]
    );


    // this executes 'setTimer' once, which refreshes the observationlist every minute
/*
    useEffect(() => {
            setTimer(setInterval(() => fetchObservations(url_observations), 60000))

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

            // apply all the filters in my_state to the url_observations
            url = getFilteredUrl(url, my_state)

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

    // get the data from the api
    const fetchProjects = (url) => {
        if (my_state.status_projects !== 'fetching')  {

            // apply all the filters in my_state to the url_observations
            url = getFilteredUrl(url, my_state)

            //alert('fetchObservations: ' + (url_observations))
            my_dispatch({type: SET_STATUS_PROJECTS, status_projects: 'fetching'})

            fetch(url)
                .then(results => {
                    return results.json();
                })
                .then(data => {
                    my_dispatch({type: SET_FETCHED_PROJECTS, fetched_projects: data.results})
                    my_dispatch({type: SET_TOTAL_PROJECTS, total_projects: data.count})
                    my_dispatch({type: SET_STATUS_PROJECTS, status_projects: 'fetched'})
                })
                .catch(function () {
                    my_dispatch({type: SET_STATUS_PROJECTS, status_projects: 'failed'})
                    alert("fetch projects to " + url + " failed.");
                })
        }
    }

    return (
        <Router basename="astroview">
            <div>
                <NavigationBar/>
                <ButtonBar/>
                {/*
                 A <Switch> looks through all its children <Route>
                 elements and renders the first one whose path
                 matches the current URL. Use a <Switch> any time
                 you have multiple routes, but you want only one
                 of them to render at a time
                 */}

                <Switch>
                    <Route exact path="/">
                        <Observations />
                    </Route>

                    <Route path="/projects">
                        <Projects />
                    </Route>

                    <Route path="/projectsss/:id" children={<ProjectsForward />} />

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
            <footer><small> (C) 2020 - Nico Vermaas - version 1.8.0 - 16 aug 2020</small></footer>
        </Router>
    );
}

function findElement(arr, propName, propValue) {
    for (var i=0; i < arr.length; i++)
        if (arr[i][propName] === propValue)
            return arr[i];
}

// reroute to dataproduct details
function ObservationDetailsForward() {
    // get the observation info from the global state.
    const [ my_state , my_dispatch] = useGlobalReducer()


    let { id } = useParams();

    // find the current observation in the fetched observations by taskID
    let observation
    try {
        observation = findElement(my_state.fetched_observations, "taskID", id)
    } catch (e) {
        return null
    }

    let renderObservationDetails
    
    if (observation.task_type==="master") {
        // show the master and its (fetched) children
        let renderChildren = observation.children.map((taskid) => {
            return <ObservationDetails taskid={taskid}/>
            }
        )
        renderObservationDetails = <div>
            <ObservationDetails taskid={id} />{renderChildren}
        </div>

    } else {
        // show a single observation
        renderObservationDetails = <ObservationDetails taskid={id}/>
    }

    return (
        <div>{renderObservationDetails}</div>
    );
}

// reroute to projects details
function ProjectsForward() {
    const [ my_state , my_dispatch] = useGlobalReducer()
    let { id } = useParams();

    //let backend_filter = '&fieldsearch='+id
    //alert(backend_filter)
    //my_dispatch({type: SET_BACKEND_FILTER, backend_filter: backend_filter})

    return (
        <Projects taskid={id}/>
    );
}

export default Main;