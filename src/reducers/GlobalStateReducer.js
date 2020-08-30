// Nico Vermaas - 28 oct 2019
// This is the reducer for the global state providor.

// possible actions
export const SET_AUTHENTICATED = 'SET_AUTHENTICATED'
export const RELOAD = 'RELOAD'

export const SET_STATUS = 'SET_STATUS'
export const SET_FETCHED_OBSERVATIONS = 'SET_FETCHED_OBSERVATIONS'
export const SET_TOTAL_OBSERVATIONS = 'SET_TOTAL_OBSERVATIONS'
export const SET_OBSERVATION_PAGE = 'SET_OBSERVATION_PAGE'

export const SET_STATUS_PROJECTS = 'SET_STATUS_PROJECTS'
export const SET_FETCHED_PROJECTS = 'SET_FETCHED_PROJECTS'
export const SET_TOTAL_PROJECTS = 'SET_TOTAL_PROJECTS'
export const SET_PROJECT_PAGE = 'SET_PROJECT_PAGE'
export const SET_CURRENT_PROJECT = 'SET_CURRENT_PROJECT'

export const SET_CURRENT_OBSERVATION = 'SET_CURRENT_OBSERVATION'
export const SET_ACTIVE_OBSERVATION = 'SET_ACTIVE_OBSERVATION'

export const SET_CURRENT_OBSERVATIONS = 'SET_CURRENT_OBSERVATIONS'

// filter actions
export const SET_OBSERVATION_IMAGE_TYPE = 'SET_OBSERVATION_IMAGE_TYPE'
export const SET_OBSERVATION_QUALITY = 'SET_OBSERVATION_QUALITY'
export const SET_OBSERVATION_STATUS = 'SET_OBSERVATION_STATUS'
export const SET_OBSERVATION_ISO = 'SET_OBSERVATION_ISO'
export const SET_OBSERVATION_FOCAL_LENGTH = 'SET_OBSERVATION_FOCAL_LENGTH'

export const SET_BACKEND_FILTER = 'SET_BACKEND_FILTER'
export const SET_IMAGE_TYPE = 'SET_IMAGE_TYPE'
export const SET_THUMBNAIL_IMAGE_TYPE = 'SET_THUMBNAIL_IMAGE_TYPE'
export const SET_VIEW = 'SET_VIEW'

export const initialState = {
        authenticated : false,
        reload : false,
        taskid: undefined,
        observation: undefined,

        status: "unfetched",
        fetched_observations: undefined,
        total_observations: undefined,
        observation_page: 1,

        status_projects : "unfetched",
        fetched_projects: undefined,
        total_projects: undefined,
        project_page: 1,
        current_project: undefined,
        current_observation: undefined,
        current_observations: undefined,

        observation_image_type: "All",
        observation_quality: "All",
        observation_status: "All",
        observation_iso: "All",
        observation_focal_length: "All",
        backend_filter: undefined,
        image_type: "annotated",
        thumbnail_image_type: "sky_plot",
        view: "list"
}

export const reducer = (state, action) => {
    switch (action.type) {

        case SET_AUTHENTICATED:
            return {
                ...state,
                authenticated: action.authenticated
            };

        case RELOAD:
            //alert('reload')
            return {
                ...state,
                reload: action.reload
            };

        case SET_STATUS:
            return {
                ...state,
                status: action.status
            };
            
        case SET_OBSERVATION_IMAGE_TYPE:
            return {
                ...state,
                observation_image_type: action.observation_image_type
            };

        case SET_OBSERVATION_QUALITY:
            return {
                ...state,
                observation_quality: action.observation_quality
            };

        // note that this is not the fetching status, but a filter to get observations of a certain status
        case SET_OBSERVATION_STATUS:
            return {
                ...state,
                observation_status: action.observation_status
            };

        case SET_OBSERVATION_ISO:
            return {
                ...state,
                observation_iso: action.observation_iso
            };

        case SET_OBSERVATION_FOCAL_LENGTH:
            return {
                ...state,
                observation_focal_length: action.observation_focal_length
            };


        case SET_ACTIVE_OBSERVATION:
            //alert('reducer: SET_ACTIVE_OBSERVATION '+action.observation)
            return {

                ...state,
                observation: action.observation
            };

        case SET_FETCHED_OBSERVATIONS:
                // let fetched_projects = getProjects(action.fetched_observations,1000)

            return {
                ...state,
                fetched_observations: action.fetched_observations,
                // fetched_projects: fetched_projects
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

        case SET_STATUS_PROJECTS:
            return {
                ...state,
                status_projects: action.status_projects
            };
            
        case SET_FETCHED_PROJECTS:
            //alert('reducer: SET_FETCHED_PROJECTS '+action.fetched_observations)
            return {
                ...state,
                fetched_projects: action.fetched_projects
            };

        case SET_TOTAL_PROJECTS:
            return {
                ...state,
                total_projects: action.total_projects,
            };

        case SET_PROJECT_PAGE:
            // a change in project_page is used to trigger a new fetch,
            // see the useEffect in the Main.js how that is done.
            return {
                ...state,
                project_page: action.project_page,
            };

        case SET_CURRENT_PROJECT:
            //alert('SET_CURRENT_PROJECT '+action.current_project)
            return {
                ...state,
                current_project: action.current_project,
            };

        case SET_CURRENT_OBSERVATION:
            //alert('SET_CURRENT_OBSERVATION: '+action.current_observation)
            return {
                ...state,
                current_observation: action.current_observation,
            };

        case SET_CURRENT_OBSERVATIONS:
            //alert('SET_CURRENT_OBSERVATIONS: '+action.current_observations.length)
            return {
                ...state,
                current_observations: action.current_observations,
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