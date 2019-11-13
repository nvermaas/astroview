// Nico Vermaas - 28 oct 2019
// This is the reducer for the global state providor.

// possible actions
export const SET_STATUS = 'SET_STATUS'
export const SET_ACTIVE_TASKID = 'SET_ACTIVE_TASKID'
export const SET_ACTIVE_OBSERVATION = 'SET_ACTIVE_OBSERVATION'
export const SET_FETCHED_OBSERVATIONS = 'SET_FETCHED_OBSERVATIONS'
export const SET_FILTERED_OBSERVATIONS = 'SET_FILTERED_OBSERVATIONS'
export const SET_FILTER_TYPE = 'SET_FILTER_TYPE'
export const SET_IMAGE_TYPE = 'SET_IMAGE_TYPE'
export const SET_THUMBNAIL_IMAGE_TYPE = 'SET_THUMBNAIL_IMAGE_TYPE'
export const SET_VIEW = 'SET_VIEW'

export const initialState = {
        status: "unfetched",
        taskid: undefined,
        observation: undefined,
        fetched_observations: undefined,
        filtered_observations: undefined,
        filter_type: "show_fetched",
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
            return {
                ...state,
                fetched_observations: action.fetched_observations
            };


        case SET_FILTERED_OBSERVATIONS:
            //alert('reducer: SET_FILTERED_OBSERVATIONS '+action.filtered_observations)
            return {
                ...state,
                filtered_observations: action.filtered_observations
            };

        case SET_FILTER_TYPE:
            return {
                ...state,
                filter_type: action.filter_type
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