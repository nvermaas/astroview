// Nico Vermaas - 28 oct 2019
// This is the reducer for the global state providor.

import { getProjects } from '../utils/filterObservations'

// possible actions
export const SET_STATUS = 'SET_STATUS'
export const SET_ACTIVE_TASKID = 'SET_ACTIVE_TASKID'
export const SET_ACTIVE_OBSERVATION = 'SET_ACTIVE_OBSERVATION'
export const SET_FETCHED_OBSERVATIONS = 'SET_FETCHED_OBSERVATIONS'
export const SET_TOTAL_OBSERVATIONS = 'SET_TOTAL_OBSERVATIONS'
export const SET_OBSERVATION_PAGE = 'SET_OBSERVATION_PAGE'

export const SET_FILTERED_OBSERVATIONS = 'SET_FILTERED_OBSERVATIONS'
export const SET_FETCHED_PROJECTS = 'SET_FETCHED_PROJECTS'
export const SET_FILTERED_PROJECTS = 'SET_FILTERED_PROJECTS'

export const SET_FILTER_TYPE = 'SET_FILTER_TYPE'
export const SET_BACKEND_FILTER = 'SET_BACKEND_FILTER'

export const SET_IMAGE_TYPE = 'SET_IMAGE_TYPE'
export const SET_THUMBNAIL_IMAGE_TYPE = 'SET_THUMBNAIL_IMAGE_TYPE'
export const SET_VIEW = 'SET_VIEW'

export const initialState = {
        status: "unfetched",
        taskid: undefined,
        observation: undefined,
        fetched_observations: undefined,
        total_observations: undefined,
        observation_page: 1,
        filtered_observations: undefined,
        filter_type: "show_fetched",
        backend_filter: undefined,
        image_type: "raw",
        thumbnail_image_type: "sky_plot",
        view: "list"
}

export const reducer = (state, action) => {
    switch (action.type) {

        case SET_STATUS:
            //alert('reducer: SET_STATUS '+action.status)
            return {
                ...state,
                status: action.status
            };

        case SET_ACTIVE_TASKID:
            //alert('reducer: SET_ACTIVE_TASKID '+action.taskid)
            return {
                ...state,
                taskid: action.taskid
            };

        case SET_ACTIVE_OBSERVATION:
            //alert('reducer: SET_ACTIVE_OBSERVATION '+action.observation)
            return {

                ...state,
                observation: action.observation
            };

        case SET_FETCHED_OBSERVATIONS:
            //alert('reducer: SET_FETCHED_OBSERVATIONS '+action.fetched_observations)
                let fetched_projects = getProjects(action.fetched_observations,1000)

            return {
                ...state,
                fetched_observations: action.fetched_observations,
                fetched_projects: fetched_projects
            };

        case SET_TOTAL_OBSERVATIONS:
            return {
                ...state,
                total_observations: action.total_observations,
            };

        case SET_OBSERVATION_PAGE:
            // a change in observation_page is used to trigger a new fetch,
            // see the useEffect in the Main.js how that is done.
            return {
                ...state,
                observation_page: action.observation_page,
            };

        case SET_FETCHED_PROJECTS:
            //alert('reducer: SET_FETCHED_PROJECTS '+action.fetched_observations)
            return {
                ...state,
                fetched_projects: action.fetched_projects
            };

        case SET_FILTERED_OBSERVATIONS:
            //alert('reducer: SET_FILTERED_OBSERVATIONS '+action.filtered_observations)
            let filtered_projects = getProjects(action.filtered_observations,100)
            return {
                ...state,
                filtered_observations: action.filtered_observations,
                filtered_projects: filtered_projects
            };

        case SET_FILTERED_PROJECTS:
            //alert('reducer: SET_FILTERED_PROJECTS '+action.filtered_observations)
            return {
                ...state,
                filtered_projects: action.filtered_projects
            };

        case SET_FILTER_TYPE:
            return {
                ...state,
                filter_type: action.filter_type
            };

        case SET_BACKEND_FILTER:
            return {
                ...state,
                backend_filter: action.backend_filter
            };

        case SET_IMAGE_TYPE:
            return {
                ...state,
                image_type: action.image_type
            };

        case SET_THUMBNAIL_IMAGE_TYPE:
            return {
                ...state,
                thumbnail_image_type: action.thumbnail_image_type
            };

        case SET_VIEW:
            return {
                ...state,
                view: action.view
            };

        default:
            return state;
    }
};