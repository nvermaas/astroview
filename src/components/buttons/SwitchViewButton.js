import React from 'react';
import { Button } from 'react-bootstrap';
import { useLocation } from "react-router-dom"
import { useGlobalReducer } from '../../Store';


import { SET_VIEW } from '../../reducers/GlobalStateReducer'

// conditionally render the switch view button
export default function SwitchViewButton(props) {
    const [ my_state , my_dispatch] = useGlobalReducer()

    let view
    const handleClick = (observation) => {
        switch (my_state.view) {
            case "list":
                view = "tiles"
                break;
            case "tiles":
                view = "list"
                break;
            default:
                view = "list"
        }
        my_dispatch({type: SET_VIEW, view: view})
    }

    let location = useLocation()
    if (location.pathname === '/observations') {
        return <Button variant="outline-info" onClick={() => handleClick(props.observation)}>Switch View</Button>
    } else {
        return null
    }
}