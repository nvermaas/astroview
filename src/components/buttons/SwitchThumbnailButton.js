import React from 'react';
import { Button } from 'react-bootstrap';
import { useLocation } from "react-router-dom"
import { useGlobalReducer } from '../../contexts/GlobalContext';

import { SET_THUMBNAIL_IMAGE_TYPE } from '../../reducers/GlobalStateReducer'

// conditionally render the switch view button
export default function SwitchThumbnailButton(props) {
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
    // only show this button in tiles view and on the observation list page
    if (my_state.view === 'tiles') {
        if (location.pathname === '/observations' || location.pathname === '/') {
            return <Button variant="outline-primary" onClick={() => handleClick(props.observation)}>Switch
                Thumbnail</Button>
        }
    }
    return null

}