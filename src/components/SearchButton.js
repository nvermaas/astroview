import React from 'react';
import { Form, FormControl, Button } from 'react-bootstrap';
import { useGlobalReducer } from '../Store';
import { useLocation } from "react-router-dom"
import filterObservations from '../utils/filterObservations'

import { SET_FILTERED_OBSERVATIONS, SET_FETCHED_OBSERVATIONS, SET_STATUS } from '../reducers/GlobalStateReducer'

// this search component uses 2 mechanisms to do the same thing.
// typing in the searchbox and hitting 'enter' will trigger a search
// clicking on the 'search button' will also trigger a seach

export default function SearchButton(props) {
    const [ my_state , my_dispatch] = useGlobalReducer()

    let text_to_search

    function doTheFilter() {
        //alert('doTheFilter('+text_to_search+')')
        let filtered_observations = filterObservations(text_to_search, my_state.fetched_observations, 100)

        // execute the filter...
        my_dispatch({type: SET_FILTERED_OBSERVATIONS, filtered_observations: filtered_observations})

        // ..and let the application know about it by setting the global state to 'filtered'
        my_dispatch({type: SET_STATUS, status: "filtered"})
    }

    const handleClick = (event) => {
        my_dispatch({type: SET_STATUS, status: "fetched"})
        //doTheFilter()
    }

    const handleKeyPress = (event) => {
        if(event.charCode==13){
            doTheFilter()
        }
    }

    const handleChange = (event) => {
        text_to_search = event.target.value.toUpperCase()
        doTheFilter()
    }

    // only show this button on the observations screen
    let location = useLocation()
    if (location.pathname == '/observations') {
        return <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" onChange={handleChange} />
            <Button variant="outline-info" onClick={handleClick}>Reset Filter</Button>
        </Form>
    } else {
        return null
    }

}
