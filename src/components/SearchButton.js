import React from 'react';
import { Form, FormControl, Button } from 'react-bootstrap';
import { useGlobalReducer } from '../Store';
import { useLocation } from "react-router-dom"
import filterObservations from '../utils/filterObservations'

import { SET_FILTERED_OBSERVATIONS, SET_FILTER_TYPE } from '../reducers/GlobalStateReducer'

// typing in the search box will execute a filter and dispatch it. The observation screen responds instantly.
export default function SearchButton(props) {
    const [ my_state , my_dispatch] = useGlobalReducer()

    let text_to_search

    function doTheFilter() {
        //alert('doTheFilter('+text_to_search+')')
        let filtered_observations = filterObservations(text_to_search, my_state.fetched_observations, 100)

        // execute the filter...
        my_dispatch({type: SET_FILTERED_OBSERVATIONS, filtered_observations: filtered_observations})

        // ..and let the application know about it by setting the global state to 'filtered'
        my_dispatch({type: SET_FILTER_TYPE, filter_type: "show_filtered"})
    }

    const handleResetClick = (event) => {
        my_dispatch({type: SET_FILTER_TYPE, filter_type: "show_fetched"})
    }

    const handleChange = (event) => {
        text_to_search = event.target.value.toUpperCase()
        doTheFilter()
    }

    // only show this button on the observations screen
    let location = useLocation()
    if (location.pathname === '/observations') {
        return <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" onChange={handleChange} />
            <Button variant="outline-info" onClick={handleResetClick}>Reset Filter</Button>
        </Form>
    } else {
        return null
    }

}
