import React from 'react';
import { Form, FormControl, Button } from 'react-bootstrap';
import { useGlobalReducer } from '../../contexts/GlobalContext';
import { useLocation } from "react-router-dom"
import { ResetFilters } from '../ButtonBar'

import {
    SET_OBSERVATION_PAGE,
    SET_BACKEND_FILTER,
    SET_OBSERVATION_IMAGE_TYPE,
    SET_OBSERVATION_QUALITY,
    SET_OBSERVATION_STATUS,
    SET_OBSERVATION_ISO,
    SET_OBSERVATION_FOCAL_LENGTH
} from '../../reducers/GlobalStateReducer'

// typing in the search box will execute a filter and dispatch it. The observation screen responds instantly.
export default function SearchButton(props) {
    const [ my_state , my_dispatch] = useGlobalReducer()

    let text_to_search

    function doTheBackendFilter() {

        let backend_filter = '&fieldsearch='+text_to_search

        // if the search text contains a comma, then this is probably a coordinate search
        if (text_to_search.includes(',')) {
            backend_filter = '&coordsearch='+text_to_search
        }

        // execute the filter...
        my_dispatch({type: SET_BACKEND_FILTER, backend_filter: backend_filter})
        my_dispatch({type: SET_OBSERVATION_PAGE, observation_page: 1})
    }

    const handleResetClick = (event) => {
        my_dispatch({type: SET_BACKEND_FILTER, backend_filter: undefined})

        // also reset all button filters
        my_dispatch({type: SET_OBSERVATION_IMAGE_TYPE, observation_image_type: "All"})
        my_dispatch({type: SET_OBSERVATION_QUALITY, observation_quality: "All"})
        my_dispatch({type: SET_OBSERVATION_STATUS, observation_status: "All"})
        my_dispatch({type: SET_OBSERVATION_ISO, observation_iso: "All"})
        my_dispatch({type: SET_OBSERVATION_FOCAL_LENGTH, observation_focal_length: "All"})

    }

    // use if you want the search to start while you hit enter
    // onKeyPress={handleKeyPress}
    const handleKeyPress = (event) => {
        text_to_search = event.target.value.toUpperCase()

        if (event.charCode == 13) {
            // start the search to the backend when the <enter> button is pressed
            doTheBackendFilter()

            // prevent the enter key to reload the whole page
            event.preventDefault()
        }

    }

    // only show this button on the observations screen
    let location = useLocation()

    if (location.pathname === '/' ||
        location.pathname === '/observations' ||
        location.pathname === '/projects' ||
        location.pathname === '/collections') {
        return <Form inline>
            <FormControl type="text" placeholder="Orion" className="mr-sm-2" onKeyPress={handleKeyPress} />
            <Button variant="outline-primary" onClick={handleResetClick}>Reset Filter</Button>
        </Form>
    } else {
        return null
    }

}
