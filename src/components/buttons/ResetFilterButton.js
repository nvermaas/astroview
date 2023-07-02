import React from 'react';
import { Button } from 'react-bootstrap';
import { useLocation } from "react-router-dom"
import { useGlobalReducer } from '../../contexts/GlobalContext';

import {
    SET_BACKEND_FILTER,
    SET_OBSERVATION_IMAGE_TYPE,
    SET_OBSERVATION_QUALITY,
    SET_OBSERVATION_STATUS,
    SET_OBSERVATION_ISO,
    SET_OBSERVATION_FOCAL_LENGTH, SET_OBSERVATION_INSTRUMENT
} from '../../reducers/GlobalStateReducer'

// conditionally render the switch view button
export default function ResetFilterButton(props) {
    const [ my_state , my_dispatch] = useGlobalReducer()

    const handleResetClick = (event) => {
        my_dispatch({type: SET_BACKEND_FILTER, backend_filter: undefined})

        // also reset all button filters
        my_dispatch({type: SET_OBSERVATION_IMAGE_TYPE, observation_image_type: "All"})
        my_dispatch({type: SET_OBSERVATION_QUALITY, observation_quality: "All"})
        my_dispatch({type: SET_OBSERVATION_STATUS, observation_status: "All"})
        my_dispatch({type: SET_OBSERVATION_ISO, observation_iso: "All"})
        my_dispatch({type: SET_OBSERVATION_INSTRUMENT, observation_instrument: "All"})
        my_dispatch({type: SET_OBSERVATION_FOCAL_LENGTH, observation_focal_length: "All"})

    }

    let location = useLocation()
    if (location.pathname === '/' ||
        location.pathname === '/observations' ||
        location.pathname === '/projects' ||
        location.pathname === '/collections') {
        return <Button variant="outline-primary" onClick={handleResetClick}>Reset Filter</Button>
    } else {
        return null
    }
}