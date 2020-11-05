import React from 'react';
import { Button } from 'react-bootstrap';
import { useLocation } from "react-router-dom"
import { useGlobalReducer } from '../../contexts/GlobalContext';
import { RELOAD, REFRESH } from '../../reducers/GlobalStateReducer'

import { getQualityIcon } from '../../utils/styling'
import { ASTROBASE_URL } from '../../utils/skyserver'
const url_quality = ASTROBASE_URL + "observations"

// conditionally render the switch view button
export default function SetQualityButton(props) {
    const [ my_state , my_dispatch] = useGlobalReducer()


    const handleClick = (observation) => {
        // this posts a new quality (or rather, it abuses a get)
        let url = url_quality + '/' + observation.id + '/setquality/' + props.quality + '/1'
        fetch(url)

        my_dispatch({type: RELOAD, reload: !my_state.reload})
    }

    let style="info"
    switch (props.quality) {
        case "great":
            style = "success"
            break;
        case "good":
            style = "success"
            break;
        case "medium":
            style = "warning"
            break;
        case "bad":
            style = "danger"
            break;
        default:
    }

    return <Button variant={style} onClick={() => handleClick(props.observation)}>{getQualityIcon(props.quality)} {props.quality}</Button>

}