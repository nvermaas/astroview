import React, {useState, useEffect, useContext }  from 'react';
import '../App.css';

import { useGlobalReducer } from '../contexts/GlobalContext';
import { FetchData } from '../FetchData'

import { NavigationBar } from './NavigationBar';
import Observations from '../routes/observations/ObservationsPage';
import Projects from '../routes/projects/ProjectsPage';
import Collections from '../routes/collections/CollectionsPage';
import ObservationDetails from '../routes/details/ObservationDetails';
import LoadCollection from '../routes/collections/LoadCollection';
import Survey from '../routes/survey/Survey';
import { About } from '../routes/about/About';

import { AuthContext } from "../contexts/AuthContext";

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

function findElement(arr, propName, propValue) {
    try {
        for (var i = 0; i < arr.length; i++) {
            //alert(arr[i][propName] + '===' + propValue)
            if (arr[i][propName] === propValue) {
                return arr[i];
            }
        }
    } catch (e) {
        return undefined
    }
}

// reroute to dataproduct details
function ObservationDetailsForward() {
    // get the observation info from the global state.
    const [ my_state , my_dispatch] = useGlobalReducer()

    let { id } = useParams();
    console.log('ObservationDetailsForward('+id+')')

    // find the current observation in the fetched observations or projects list by taskID
    let observation = findElement(my_state.fetched_observations, "taskID", id)

    // if not found in the current observation page, look for it as project in the projects page
    if (observation === undefined) {
        observation = findElement(my_state.fetched_projects, "taskID", id)
    }
    // or in the list of observations belonging to the currently selected project
    if (observation === undefined) {
        observation = findElement(my_state.current_observations, "taskID", id)
    }

    if (observation === undefined) {
        //alert(id)
        return <ObservationDetails taskid={id}/>
    }

    let renderObservationDetails

    if (observation.task_type==="master") {
        // show the master and its (fetched) children
        if (my_state.current_observations!==undefined) {
            renderObservationDetails = my_state.current_observations.map((observation) => {
                    return <ObservationDetails data={my_state.current_observations} taskid={observation.taskID}/>
                }
            )
        }

    } else {
        // show a single observation
        if (my_state.current_observations!==undefined) {
            renderObservationDetails = <ObservationDetails data={my_state.current_observations} taskid={id}/>
        } else {
            renderObservationDetails = <ObservationDetails data={my_state.fetched_observations} taskid={id}/>
        }
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

// reroute to collection details
function CollectionDetailsForward() {
    // get the observation info from the global state.
    const [ my_state , my_dispatch] = useGlobalReducer()

    let { id } = useParams();

    let renderObservationDetails

    // show the master and its (fetched) children
    if (my_state.current_observations!==undefined) {
        renderObservationDetails = my_state.current_observations.map((observation) => {
                return <ObservationDetails data={my_state.current_observations} taskid={observation.taskID}/>
            }
        )
    } else {
        // this triggers the loading of the collection, which is needed to load the observations
        return <LoadCollection id={id}/>
    }

    return (
        <div>{renderObservationDetails}</div>
    );
}

function Main () {

    // use global state
    const [ my_state , my_dispatch] = useGlobalReducer()
    const { handleLogin, handleLogout } = useContext(AuthContext);

    // fetch all the data. Contains the useEffect hooks that re-fetch the data when the state changes.
    FetchData()

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
                        <Observations />
                    </Route>

                    <Route exact path="/login" component={handleLogin} />
                    <Route exact path="/logout" component={handleLogout} />

                    <Route path="/collections">
                        <Collections />
                    </Route>

                    <Route path="/collection-details/:id" children={<CollectionDetailsForward />} />

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
            <footer><small> (C) 2020 - Nico Vermaas - version 1.11.1 - 21 nov 2020 - 14:00</small></footer>
        </Router>
    );
}

export default Main;