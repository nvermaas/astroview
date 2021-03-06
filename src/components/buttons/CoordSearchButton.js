import React from 'react';
import { Form, FormControl, Button } from 'react-bootstrap';
import { useGlobalReducer } from '../../contexts/GlobalContext';
import { useLocation, useHistory } from "react-router-dom"
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
export default function CoordSearchButton(props) {
    const [ my_state , my_dispatch] = useGlobalReducer()
    const history = useHistory();
    let text_to_search

    function doTheBackendFilter() {

        let backend_filter = '&coordsearch='+text_to_search

        // execute the filter...
        my_dispatch({type: SET_BACKEND_FILTER, backend_filter: backend_filter})
        my_dispatch({type: SET_OBSERVATION_PAGE, observation_page: 1})
    }


    // use if you want the search to start while you hit enter
    // onKeyPress={handleKeyPress}
    const handleKeyPress = (event) => {

        text_to_search = event.target.value.toUpperCase()

        if (event.charCode == 13) {
            // start the search to the backend when the <enter> button is pressed
            doTheBackendFilter()
            history.push("/observations")
            // prevent the enter key to reload the whole page
            event.preventDefault()
        }

    }

    // only show this button on the observations screen
    let location = useLocation()

    if (location.pathname === '/' ||
        location.pathname === '/observations' ||
        location.pathname === '/projects' ||
        location.pathname ==='/collections' ||
        location.pathname.includes('details')) {
        return <Form inline>
            <FormControl type="text" placeholder="84.1, 9.0" className="mr-sm-2" onKeyPress={handleKeyPress} />
        </Form>
    } else {
        return null
    }

}
