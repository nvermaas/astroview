// Nico Vermaas - 28 oct 2019
// This is the reducer for the global state providor.

// possible actions
export const SET_AUTHENTICATED = 'SET_AUTHENTICATED'
export const RELOAD = 'RELOAD'
export const SHOW_SPLASH = 'SHOW_SPLASH'

export const SET_STATUS = 'SET_STATUS'
export const SET_FETCHED_OBSERVATIONS = 'SET_FETCHED_OBSERVATIONS'
export const SET_TOTAL_OBSERVATIONS = 'SET_TOTAL_OBSERVATIONS'
export const SET_OBSERVATION_PAGE = 'SET_OBSERVATION_PAGE'

export const SET_STATUS_PROJECTS = 'SET_STATUS_PROJECTS'
export const SET_FETCHED_PROJECTS = 'SET_FETCHED_PROJECTS'
export const SET_TOTAL_PROJECTS = 'SET_TOTAL_PROJECTS'
export const SET_PROJECT_PAGE = 'SET_PROJECT_PAGE'
export const SET_CURRENT_PROJECT = 'SET_CURRENT_PROJECT'

export const SET_STATUS_COLLECTIONS = 'SET_STATUS_COLLECTIONS'
export const SET_FETCHED_COLLECTIONS = 'SET_FETCHED_COLLECTIONS'
export const SET_TOTAL_COLLECTIONS = 'SET_TOTAL_COLLECTIONS'
export const SET_COLLECTION_PAGE = 'SET_COLLECTION_PAGE'
export const SET_CURRENT_COLLECTION = 'SET_CURRENT_COLLECTION'

export const SET_STATUS_CUTOUTS = 'SET_STATUS_CUTOUTS'
export const SET_TOTAL_CUTOUTS = 'SET_TOTAL_CUTOUTS' 
export const SET_FETCHED_CUTOUTS = 'SET_FETCHED_CUTOUTS'
export const SET_CURRENT_CUTOUT = 'SET_CURRENT_CUTOUT'

export const SET_STATUS_CUTOUT_IMAGES = 'SET_STATUS_CUTOUT_IMAGES'
export const SET_FETCHED_CUTOUT_IMAGES = 'SET_FETCHED_CUTOUT_IMAGES'
export const SET_CURRENT_CUTOUT_IMAGE = 'SET_CURRENT_CUTOUT_IMAGE'
export const SET_CUTOUT_PAGE = 'SET_CUTOUT_PAGE'

export const SET_CURRENT_TASK_ID = 'SET_CURRENT_TASK_ID'
export const SET_ACTIVE_OBSERVATION = 'SET_ACTIVE_OBSERVATION'
export const SET_CURRENT_OBSERVATION = 'SET_CURRENT_OBSERVATION'
export const SET_CURRENT_OBSERVATIONS = 'SET_CURRENT_OBSERVATIONS'

export const SET_STATUS_JOBS = 'SET_STATUS_JOBS'
export const SET_FETCHED_JOBS = 'SET_FETCHED_JOBS'
export const SET_NR_OF_JOBS = 'SET_NR_OF_JOBS'

export const SET_STATUS_BOXES = 'SET_STATUS_BOXES'
export const SET_FETCHED_BOXES = 'SET_FETCHED_BOXES'

// filter actions
export const SET_OBSERVATION_IMAGE_TYPE = 'SET_OBSERVATION_IMAGE_TYPE'
export const SET_OBSERVATION_QUALITY = 'SET_OBSERVATION_QUALITY'
export const SET_OBSERVATION_STATUS = 'SET_OBSERVATION_STATUS'
export const SET_OBSERVATION_ISO = 'SET_OBSERVATION_ISO'
export const SET_OBSERVATION_INSTRUMENT = 'SET_OBSERVATION_INSTRUMENT'
export const SET_OBSERVATION_FOCAL_LENGTH = 'SET_OBSERVATION_FOCAL_LENGTH'

export const SET_BACKEND_FILTER = 'SET_BACKEND_FILTER'
export const SET_IMAGE_TYPE = 'SET_IMAGE_TYPE'
export const SET_THUMBNAIL_IMAGE_TYPE = 'SET_THUMBNAIL_IMAGE_TYPE'
export const SET_VIEW = 'SET_VIEW'

export const ALADIN_RA = 'ALADIN_RA'
export const ALADIN_DEC = 'ALADIN_DEC'
export const ALADIN_FOV = 'ALADIN_FOV'
export const ALADIN_MODE = 'ALADIN_MODE'
export const ALADIN_HIGH_OBS = 'ALADIN_HIGH_OBS'

export const initialState = {
        authenticated : false,
        reload : false,
        show_splash : true,
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

        status_collections : "unfetched",
        fetched_collections: undefined,
        total_collections: undefined,
        collection_page: 1,
        current_collection: undefined,

        status_cutouts : "unfetched",
        fetched_cutouts: undefined,
        total_cutouts: undefined,
        current_cutout: undefined,

        status_cutout_images : "unfetched",
        fetched_cutout_images: undefined,
        current_cutout_image: undefined,
        cutout_page: "directories",
    
        observation_image_type: "All",
        observation_quality: "All",
        observation_status: "All",
        observation_iso: "All",
        observation_focal_length: "All",
        observation_instrument: "All",
        backend_filter: undefined,
        image_type: "annotated_grid",
        thumbnail_image_type: "sky_plot",
        view: "list",
        status_jobs : "unfetched",
        fetched_jobs: undefined,
        nr_of_jobs : 0,

        status_boxes : "unfetched",
        fetched_boxes: undefined,
    
        aladin_ra: "84.17",
        aladin_dec: "8.92",
        aladin_fov: "10",
        aladin_mode: "rectangle",
        aladin_high_obs: undefined
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

        case SHOW_SPLASH:
            return {
                ...state,
                show_splash: action.show_splash
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

        case SET_OBSERVATION_INSTRUMENT:
            return {
                ...state,
                observation_instrument: action.observation_instrument
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

        case SET_STATUS_COLLECTIONS:
            return {
                ...state,
                status_collections: action.status_collections
            };

        case SET_FETCHED_COLLECTIONS:
            //alert('reducer: SET_FETCHED_COLLECTIONS '+action.fetched_collections)
            return {
                ...state,
                fetched_collections: action.fetched_collections
            };

        case SET_TOTAL_COLLECTIONS:
            return {
                ...state,
                total_collections: action.total_collections,
            };

        case SET_COLLECTION_PAGE:
            // a change in collection_page is used to trigger a new fetch,
            // see the useEffect in the Main.js how that is done.
            return {
                ...state,
                collection_page: action.collection_page,
            };

        case SET_CURRENT_COLLECTION:
            // alert('SET_CURRENT_COLLECTION '+action.current_collection)
            return {
                ...state,
                current_collection: action.current_collection,
            };

        case SET_STATUS_CUTOUTS:
            return {
                ...state,
                status_cutouts: action.status_cutouts
            };

        case SET_FETCHED_CUTOUTS:
            //alert('reducer: SET_FETCHED_CUTOUTS '+action.fetched_cutouts)
            return {
                ...state,
                fetched_cutouts: action.fetched_cutouts
            };

        case SET_TOTAL_CUTOUTS:
            return {
                ...state,
                total_cutouts: action.total_cutouts,
            };

        case SET_CURRENT_CUTOUT:
            // alert('SET_CURRENT_CUTOUT '+action.current_cutout)
            return {
                ...state,
                current_cutout: action.current_cutout,
            };

        case SET_STATUS_CUTOUT_IMAGES:
            return {
                ...state,
                status_cutout_images: action.status_cutout_images
            };

        case SET_FETCHED_CUTOUT_IMAGES:
            //alert('reducer: SET_FETCHED_CUTOUT_IMAGES '+action.fetched_cutout_images)
            return {
                ...state,
                fetched_cutout_images: action.fetched_cutout_images
            };

        case SET_CURRENT_CUTOUT_IMAGE:
            // alert('SET_CURRENT_CUTOUT_IMAGE '+action.current_cutout_image)
            return {
                ...state,
                current_cutout_image: action.current_cutout_image,
            };

        case SET_CUTOUT_PAGE:
            //alert('reducer: SET_FETCHED_CUTOUT_IMAGES '+action.fetched_cutout_images)
            return {
                ...state,
                cutout_page: action.cutout_page
            };

        case SET_CURRENT_TASK_ID:
            //alert('SET_CURRENT_TASK_ID: '+action.current_task_id)
            return {
                ...state,
                current_task_id: action.current_task_id,
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

        case SET_STATUS_JOBS:
            return {
                ...state,
                status_jobs: action.status_jobs
            };

        case SET_FETCHED_JOBS:
            //alert('reducer: SET_FETCHED_JOBS '+action.fetched_jobs)
            return {
                ...state,
                fetched_jobs: action.fetched_jobs
            };

        case SET_STATUS_BOXES:
            return {
                ...state,
                status_boxes: action.status_boxes
            };

        case SET_FETCHED_BOXES:
            //alert('SET_FETCHED_BOXES: '+ action.fetched_boxes.length.toString())
            return {
                ...state,
                fetched_boxes: action.fetched_boxes
            };
            
        case SET_NR_OF_JOBS:
            // if the number of running jobs got less, then something probably changed in the data... reload
            let prev_nr_of_jobs = state.nr_of_jobs
            if (action.nr_of_jobs < prev_nr_of_jobs) {
                return {
                    ...state,
                    nr_of_jobs: action.nr_of_jobs,
                    //reload: !state.reload
                };
            } else {
                return {
                    ...state,
                    nr_of_jobs: action.nr_of_jobs
                }
            };

        case ALADIN_RA:
            return {
                ...state,
                aladin_ra: action.aladin_ra
            };

        case ALADIN_DEC:
            return {
                ...state,
                aladin_dec: action.aladin_dec
            };

        case ALADIN_FOV:
            return {
                ...state,
                aladin_fov: action.aladin_fov
            };

        case ALADIN_MODE:

            return {
                ...state,
                aladin_mode: action.aladin_mode
            };

        case ALADIN_HIGH_OBS:

            return {
                ...state,
                aladin_high_obs: action.aladin_high_obs
            };

        default:
            return state;
    }
};