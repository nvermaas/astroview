import React, {useState, useEffect }  from 'react';

import { useGlobalReducer } from './Store';

import {
    SET_FETCHED_OBSERVATIONS,
    SET_STATUS,
    SET_TOTAL_OBSERVATIONS,
    SET_FETCHED_PROJECTS,
    SET_STATUS_PROJECTS,
    SET_TOTAL_PROJECTS,
    SET_BACKEND_FILTER,
    SET_CURRENT_OBSERVATIONS
} from './reducers/GlobalStateReducer';

import { getFilteredUrl } from './utils/filter'
import { ASTROBASE_URL } from './utils/skyserver'

export const url_observations = ASTROBASE_URL + "observations"
export const url_projects = ASTROBASE_URL + "projects"

export function FetchData () {

    // use global state
    const [ my_state , my_dispatch] = useGlobalReducer()

    // a timer is used for a 60 second polling of the data.
    const [timer, setTimer] = useState(undefined)
    // get the data from the api

    // this executes fetchObservations every time that a filter in the state is changed
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

    // this executes fetchProjects every time that a filter in the state is changed
    useEffect(() => {
            fetchProjects(url_projects)
        }, [my_state.backend_filter,
            my_state.project_page,
            my_state.observation_quality,
            my_state.observation_status,
            my_state.observation_iso,
            my_state.observation_focal_length,
            my_state.observation_image_type]
    );

    // this fetches the observations belonging to the current project when my_state current_project was changed
    useEffect(() => {
            fetchCurrentProject(url_observations)
        }, [my_state.current_project]
    );

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

    const fetchObservations = (url) => {
        if (my_state.status !== 'fetching')  {

            // apply all the filters in my_state to the url_observations

            url = getFilteredUrl(url, my_state, my_state.observation_page)
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
            url = getFilteredUrl(url, my_state, my_state.project_page)

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

    // fetch all the observations belonging to the my_state.current_project (a taskid)
    const fetchCurrentProject = (url) => {
        // alert('fetchCurrentProject: '+my_state.current_project)
        // only fetch if there is a current_project selected

        if (my_state.current_project) {
            url = url + '?fieldsearch=' + my_state.current_project
            //alert(url)
            fetch(url)
                .then(results => {
                    return results.json();
                })
                .then(data => {
                    my_dispatch({type: SET_CURRENT_OBSERVATIONS, current_observations: data.results})
                })
                .catch(function () {
                    alert("fetch projects to " + url + " failed.");
                })
        }
    }
}
