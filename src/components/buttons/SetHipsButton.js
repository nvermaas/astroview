import React from 'react';
import { Button } from 'react-bootstrap';
import { useLocation } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkedAlt } from '@fortawesome/free-solid-svg-icons'

import { useGlobalReducer } from '../../contexts/GlobalContext';

import { RELOAD } from '../../reducers/GlobalStateReducer'

import { getQualityIcon } from '../../utils/styling'
import { ASTROBASE_URL } from '../../utils/skyserver'

const url_quality = ASTROBASE_URL + "observations"

// conditionally render the switch view button
export default function SetHipsButton(props) {
    const [ my_state , my_dispatch] = useGlobalReducer()


    const handleClick = (observation) => {
        // this changes the state of the observation and renders it.

        observation.used_in_hips=props.use_in_hips

        // stupid translation of javascript 'false' to Django 'False'
        let hips = "False"
        if (props.use_in_hips) {
            hips = "True"
        }

        // this posts a new quality (or rather, it abuses a get)
        let url = url_quality + '/' + observation.id + '/sethips/' + hips + '/1'
        fetch(url)

        my_dispatch({type: RELOAD, reload: !my_state.reload})
    }

    let style="info"
    let title= "Add"

    if (props.observation.used_in_hips) {
        title = "Del from Sky"
        style = "outline-danger"
    } else {
        title = "Add To Sky"
        style = "outline-success"
    }

    return <Button variant={style} onClick={() => handleClick(props.observation)}>
        <FontAwesomeIcon icon={faMapMarkedAlt} />&nbsp; {title}
        </Button>

}