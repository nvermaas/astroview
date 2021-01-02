import React from 'react';
import {Card, Button } from 'react-bootstrap'
import { Link } from "react-router-dom"

import { useGlobalReducer } from '../../contexts/GlobalContext';
import { SET_CURRENT_TASK_ID, SET_CURRENT_PROJECT } from '../../reducers/GlobalStateReducer'

import Description from '../../components/buttons/DescriptionButton'

// display a single observation on a card
export default function ObservationThumbnail(props) {
    const [ my_state , my_dispatch] = useGlobalReducer()

    const handleDetailsClick = (observation) => {
        // dispatch current observation to the global store
        my_dispatch({type: SET_CURRENT_TASK_ID, current_task_id: observation.taskID})
        my_dispatch({type: SET_CURRENT_PROJECT, current_project: observation.taskID})

    }

    // generate the details link to forward to
    const getLink = (observation) => {
        let details_link = "/details/"+observation.taskID
        return details_link
    }

    let title = props.observation.name

    let thumbnail
    switch (my_state.thumbnail_image_type) {
        case "sky_plot":
            thumbnail = props.observation.derived_sky_plot_image
            break;
        case "raw":
            thumbnail = props.observation.derived_raw_image
            break;
        case "annotated":
            thumbnail = props.observation.derived_annotated_image
            break;
        case "sky_globe":
            thumbnail = props.observation.derived_sky_globe_image
            break;
        default:
            thumbnail = props.observation.derived_skyplot_image
    }

    let my_status = ''
    if (props.observation.my_status!=='done') {
        my_status = ' ('+props.observation.my_status+')'
    }


    return (

        <Card className="card-img-observation">
            <Card.Img variant top src={thumbnail} width="400" height="300" />

            <Card.ImgOverlay>
                <Description observation={props.observation}/>
                <h2>{title}</h2>
                <h3>{my_status}</h3>
                <Link to={() => getLink(props.observation)}>
                    <Button variant="outline-warning" onClick={() => handleDetailsClick(props.observation)}>Details</Button>&nbsp;
                </Link>

            </Card.ImgOverlay>

        </Card>

    );

}

