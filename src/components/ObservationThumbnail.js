import React from 'react';
import {Card, Button } from 'react-bootstrap'
import { Link } from "react-router-dom"

import { useGlobalReducer } from '../Store';
import { SET_ACTIVE_TASKID, SET_ACTIVE_OBSERVATION } from '../reducers/GlobalStateReducer'

// display a single observation on a card
export default function ObservationThumbnail(props) {
    const [ my_state , my_dispatch] = useGlobalReducer()

    const handleClick = (observation) => {
        // dispatch current observation to the global store
        my_dispatch({type: SET_ACTIVE_TASKID, taskid: observation.taskID})
        my_dispatch({type: SET_ACTIVE_OBSERVATION, observation: observation})
    }

    // generate the details link to forward to
    const getLink = (observation) => {
        let details_link = "/details/"+props.observation.taskID
        return details_link
    }

    let title = props.observation.name
    let description = props.observation.description
    // let thumbnail = props.observation.derived_raw_image
    let thumbnail = props.observation.derived_sky_plot_image
    let thumbnail_raw = props.observation.derived_annotated_image
    let details_link = "/details/"+props.observation.taskID

    return (

            <Card className="card-img-top">
                <Card.Img variant top src={thumbnail} />

                <Card.ImgOverlay>
                    <h2>{title}</h2>
                    <Link to={() => getLink(props.observation)}>
                        <Button variant="success" onClick={() => handleClick(props.observation)}>Details</Button>&nbsp;
                    </Link>

                </Card.ImgOverlay>

            </Card>

    );

}

