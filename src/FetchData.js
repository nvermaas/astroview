import React, {useState, useEffect }  from 'react';

import { useGlobalReducer } from './contexts/GlobalContext';

import {
    SET_FETCHED_OBSERVATIONS,
    SET_STATUS,
    SET_TOTAL_OBSERVATIONS,
    SET_FETCHED_PROJECTS,
    SET_STATUS_PROJECTS,
    SET_TOTAL_PROJECTS,
    SET_STATUS_COLLECTIONS,
    SET_TOTAL_COLLECTIONS,
    SET_FETCHED_COLLECTIONS,
    SET_CURRENT_OBSERVATIONS,
    SET_OBSERVATION_PAGE,
    SET_FETCHED_JOBS,
    SET_STATUS_JOBS,
    SET_NR_OF_JOBS,
    SET_STATUS_BOXES,
    SET_FETCHED_BOXES,
    RELOAD
} from './reducers/GlobalStateReducer';

import { getFilteredUrl, getFilteredUrlCollections } from './utils/filter'
import { getIds } from './utils/filterObservations'
import { ASTROBASE_URL } from './utils/skyserver'

//export const url_observations = ASTROBASE_URL + "observations2"
export const url_observations = ASTROBASE_URL + "observations"
export const url_admin = ASTROBASE_URL + "admin/backend_app/observation"
export const url_projects = ASTROBASE_URL + "projects"
export const url_collections = ASTROBASE_URL + "collections"
export const url_boxes = ASTROBASE_URL + "boxes"
export const url_jobs = ASTROBASE_URL + "jobs"

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
            my_state.observation_image_type,
            my_state.reload]
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
            my_state.observation_image_type,
            my_state.reload]
    );

    // this executes fetchCollections every time that a filter in the state is changed
    useEffect(() => {
            fetchCollections(url_collections)
        }, [my_state.backend_filter,
            my_state.collection_page,
            my_state.observation_image_type,
            my_state.reload]
    );

    useEffect(() => {
            fetchBoxes(url_boxes)
        }, [my_state.reload]
    );

    // this fetches the observations belonging to the current project when my_state current_project was changed
    useEffect(() => {
            fetchCurrentProject(url_observations)
        }, [my_state.current_project, my_state.reload]
    );

    // this fetches the observations belonging to the current collection when my_state current_collection was changed
    useEffect(() => {
            fetchCurrentCollection(url_observations)
        }, [my_state.current_collection, my_state.reload]
    );

    // this fetches the observations belonging to the current project when my_state current_observation was changed
    useEffect(() => {
            //alert('useEffect: '+my_state.current_observation)
            fetchCurrentObservation(url_observations)
        }, [my_state.current_task_id, my_state.reload]
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

    useEffect(() => {
            setTimer(setInterval(() => fetchCurrentObservation(url_observations), 60000))

            // this function is automatically called when the component unmounts
            return function cleanup() {
                clearInterval(timer);
            }
        },[]
    );
*/

    // this executes fetchCollections every time that a filter in the state is changed
    useEffect(() => {
            fetchJobs(url_jobs)
        }, [my_state.reload]
    );

    useEffect(() => {
            setTimer(setInterval(() => fetchJobs(url_jobs), 10000))

            // this function is automatically called when the component unmounts
            return function cleanup() {
                clearInterval(timer);
            }
        },[]
    );

    const fetchObservations = (url) => {
        if (my_state.status !== 'fetching')  {

            // apply all the filters in my_state to the url_observations

            url = getFilteredUrl(url, my_state, my_state.observation_page)

            // why is this?
            //my_dispatch({type: SET_OBSERVATION_PAGE, observation_page: 1})

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

    // get the data from the api
    const fetchCollections = (url) => {
        //alert('fetchCollections('+url+')')
        if (my_state.status_collections !== 'fetching')  {

            // apply all the filters in my_state to the url_collections
            url = getFilteredUrlCollections(url, my_state, my_state.collection_page)

            my_dispatch({type: SET_STATUS_COLLECTIONS, status_collections: 'fetching'})

            fetch(url)
                .then(results => {
                    return results.json();
                })
                .then(data => {
                    my_dispatch({type: SET_FETCHED_COLLECTIONS, fetched_collections: data.results})
                    my_dispatch({type: SET_TOTAL_COLLECTIONS, total_collections: data.count})
                    my_dispatch({type: SET_STATUS_COLLECTIONS, status_collections: 'fetched'})
                })
                .catch(function () {
                    my_dispatch({type: SET_STATUS_COLLECTIONS, status_collections: 'failed'})
                    alert("fetch collections to " + url + " failed.");
                })
        }
    }
    
    // fetch all the observations belonging to the my_state.current_project (a taskid)
    const fetchCurrentProject = (url) => {
        console.log('fetchCurrentProject: '+my_state.current_project)
        // only fetch if there is a current_project selected

        if (my_state.current_project) {
            url = url + '?fieldsearch=' + my_state.current_project

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

    // fetch all the observations belonging to the my_state.current_collection
    const fetchCurrentCollection = (url) => {

        // only fetch if there is a current_collection selected
        // http://localhost:8000/my_astrobase/observations/?id__in=2815,2817
        // alert('fetchCurrentCollection: '+my_state.current_collection)

        if (my_state.current_collection) {
            let ids = getIds(my_state.current_collection.observations)
            url = url + '?id__in=' + ids
            //alert(url)
            fetch(url)
                .then(results => {
                    return results.json();
                })
                .then(data => {
                    my_dispatch({type: SET_CURRENT_OBSERVATIONS, current_observations: data.results})
                })
                .catch(function () {
                    alert("fetch collections to " + url + " failed.");
                })
        }
    }
    

    const fetchCurrentObservation = (url) => {
        //alert('fetchCurrentObservation: '+my_state.current_observation)
        // only fetch if there is a current_project selected

        if (my_state.current_task_id) {
            url = url + '?fieldsearch=' + my_state.current_task_id

            fetch(url)
                .then(results => {
                    return results.json();
                })
                .then(data => {
                    my_dispatch({type: SET_CURRENT_OBSERVATIONS, current_observations: data.results})
                })
                .catch(function () {
                    alert("fetch observation to " + url + " failed.");
                })
        }
    }

    // get the data from the api
    const fetchJobs = (url) => {

        if (my_state.status_jobs !== 'fetching')  {

            my_dispatch({type: SET_STATUS_JOBS, status_jobs: 'fetching'})

            fetch(url)
                .then(results => {
                    return results.json();
                })
                .then(data => {
                    my_dispatch({type: SET_FETCHED_JOBS, fetched_jobs: data.results})
                    my_dispatch({type: SET_STATUS_JOBS, status_jobs: 'fetched'})

                    let nr_of_jobs = 0
                    if (data.results !==undefined) {
                        nr_of_jobs = data.results.length
                    }
                    my_dispatch({type: SET_NR_OF_JOBS, nr_of_jobs: nr_of_jobs})

                })
                .catch(function () {
                    my_dispatch({type: SET_STATUS_JOBS, status_jobs: 'failed'})
                    alert("fetch jobs from " + url + " failed.");
                })
        }
    }

    // get the data from the api
    const fetchBoxes = (url) => {

        if (my_state.status_boxes !== 'fetching')  {

            my_dispatch({type: SET_STATUS_BOXES, status_boxes: 'fetching'})

            fetch(url)
                .then(results => {
                    return results.json();
                })
                .then(data => {
                    my_dispatch({type: SET_FETCHED_BOXES, fetched_boxes: data.results})
                    my_dispatch({type: SET_STATUS_BOXES, status_boxes: 'fetched'})
                })
                .catch(function () {
                    my_dispatch({type: SET_STATUS_BOXES, status_boxes: 'failed'})
                    alert("fetch boxes to " + url + " failed.");
                })
        }
    }

}

