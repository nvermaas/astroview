import React from 'react';
import {Card, Button } from 'react-bootstrap'
import { Link } from "react-router-dom"

import { useGlobalReducer } from '../../contexts/GlobalContext';

import { getDetailsIcon } from '../../utils/styling'


import { SET_ACTIVE_OBSERVATION, SET_CURRENT_TASK_ID, SET_CURRENT_PROJECT } from '../../reducers/GlobalStateReducer'

// display a single cutout directory on a card
export default function ImageThumbnail(props) {
    const [ my_state , my_dispatch] = useGlobalReducer()

    const handleDetailsClick = (taskID) => {
        // dispatch current observation to the global store
        my_dispatch({type: SET_CURRENT_TASK_ID, current_task_id: taskID})
        my_dispatch({type: SET_CURRENT_PROJECT, current_project: taskID})
    }

    // generate the details link to forward to
    const getDetailsLink = (taskID) => {
        let details_link = "/details/"+taskID
        return details_link
    }

    let icon = getDetailsIcon(handleDetailsClick,props.cutout.observation_taskID)
    return (

        <Card className="card-img-cutout">
            <Card.Img variant top src={props.cutout.derived_url}
                      width="300" height="300" />

            <Card.ImgOverlay>
                <Link to={() => getDetailsLink(props.cutout.observation_taskID)}>
                    <div>{icon}</div>
                </Link>

                <Link to={() => getDetailsLink(props.cutout.observation_taskID)}>
                    <Button variant="outline-warning" onClick={() => handleDetailsClick(props.cutout.observation_taskID)}>{props.cutout.observation_taskID}</Button>&nbsp;
                </Link>
            </Card.ImgOverlay>

        </Card>

    );

}

