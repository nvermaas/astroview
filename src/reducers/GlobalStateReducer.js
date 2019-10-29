// Nico Vermaas - 28 oct 2019
// This is the reducer for the global state providor.

// possible actions
export const SET_STATUS = 'SET_STATUS'
export const SET_ACTIVE_TASKID = 'SET_ACTIVE_TASKID'
export const SET_ACTIVE_OBSERVATION = 'SET_ACTIVE_OBSERVATION'
export const SET_FETCHED_OBSERVATIONS = 'SET_FETCHED_OBSERVATIONS'

export const initialState = {
        status: "unfetched",
        taskid: "0",
        observation: undefined,
        fetched_observations: undefined
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

        default:
            return state;
    }
};