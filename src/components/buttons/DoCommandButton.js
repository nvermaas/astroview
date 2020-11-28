import React from 'react';
import { Button } from 'react-bootstrap';
import { useLocation } from "react-router-dom"
import { useGlobalReducer } from '../../contexts/GlobalContext';
import { RELOAD, REFRESH } from '../../reducers/GlobalStateReducer'

import { getCommandIcon } from '../../utils/styling'

import { ASTROBASE_URL } from '../../utils/skyserver'
const url_commands = ASTROBASE_URL + "run-command"

export default function DoCommandButton(props) {
    const [ my_state , my_dispatch] = useGlobalReducer()


    const handleClick = (observation,command) => {
        // this posts a new quality (or rather, it abuses a get)

        let url = url_commands + '?command=' + props.command + '&observation_id=' + observation.id
        fetch(url)
        // alert(url)
        my_dispatch({type: RELOAD, reload: !my_state.reload})
    }

    let style="info"
    switch (props.command) {
        case "grid":
            style = "outline-success"
            break;
        case "min_max":
            style = "outline-success"
            break;
        default:
    }

    return <Button variant={style} onClick={() => handleClick(props.observation, props.command)}>{getCommandIcon(props.command)} {props.title}</Button>

}