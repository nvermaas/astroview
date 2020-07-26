import React from 'react';
import { Form, FormControl, Button } from 'react-bootstrap';
import { useGlobalReducer } from '../../Store';
import { useLocation } from "react-router-dom"
import { filterObservations } from '../../utils/filterObservations'

import { SET_OBSERVATION_PAGE, SET_FILTERED_OBSERVATIONS, SET_FILTER_TYPE, SET_BACKEND_FILTER } from '../../reducers/GlobalStateReducer'

// typing in the search box will execute a filter and dispatch it. The observation screen responds instantly.
export default function SearchButton(props) {
    const [ my_state , my_dispatch] = useGlobalReducer()

    let text_to_search

    function doTheFrontendFilter() {
        let filtered_observations = filterObservations(text_to_search, my_state.fetched_observations, 100)

        // execute the filter...
        my_dispatch({type: SET_FILTERED_OBSERVATIONS, filtered_observations: filtered_observations})

        // ..and let the application know about it by setting the global state to 'filtered'
        my_dispatch({type: SET_FILTER_TYPE, filter_type: "show_filtered"})
    }

    function doTheBackendFilter() {
        //alert('doTheBackendFilter('+text_to_search+')')
        // let backend_filter = '&field_name__icontains='+text_to_search
        let backend_filter = '&fieldsearch='+text_to_search

        // execute the filter...
        my_dispatch({type: SET_BACKEND_FILTER, backend_filter: backend_filter})
        my_dispatch({type: SET_OBSERVATION_PAGE, observation_page: 1})
    }

    const handleResetClick = (event) => {
        my_dispatch({type: SET_FILTER_TYPE, filter_type: "show_fetched"})
        my_dispatch({type: SET_BACKEND_FILTER, backend_filter: undefined})

    }

    // use if you want the search to start while you type
    // onChange={handleKeyPress}
    const handleChange = (event) => {
        text_to_search = event.target.value.toUpperCase()
        doTheFrontendFilter()
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
    if (location.pathname === '/observations' || location.pathname === '/projects') {
        return <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" onKeyPress={handleKeyPress} />
            <Button variant="outline-info" onClick={handleResetClick}>Reset Filter</Button>
        </Form>
    } else {
        return null
    }

}
