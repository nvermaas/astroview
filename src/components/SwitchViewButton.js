import React from 'react';
import { Button } from 'react-bootstrap';
import { useLocation } from "react-router-dom"
import { useGlobalReducer } from '../Store';


import { SET_THUMBNAIL_IMAGE_TYPE } from '../reducers/GlobalStateReducer'

// conditionally render the switch view button
export default function SwitchViewButton(props) {
    const [ my_state , my_dispatch] = useGlobalReducer()

    let imageType
    const handleClick = (observation) => {
        switch (my_state.thumbnail_image_type) {
            case "sky_plot":
                imageType = "raw"
                break;
            case "raw":
                imageType = "sky_globe"
                break;
            case "sky_globe":
                imageType = "sky_plot"
                break;
            default:
                imageType = "sky_plot"
        }
        my_dispatch({type: SET_THUMBNAIL_IMAGE_TYPE, thumbnail_image_type: imageType})
    }

    let location = useLocation()
    if (location.pathname === '/observations') {
        return <Button variant="outline-info" onClick={() => handleClick(props.observation)}>Switch View</Button>
    } else {
        return null
    }
}