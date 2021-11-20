import React from 'react';
import {Card, Button } from 'react-bootstrap'
import { Link } from "react-router-dom"

import { useGlobalReducer } from '../../contexts/GlobalContext';
import { SET_ACTIVE_OBSERVATION } from '../../reducers/GlobalStateReducer'

// display a single cutout directory on a card
export default function ImageThumbnail(props) {
    const [ my_state , my_dispatch] = useGlobalReducer()

    const handleObservationClick = (taskID) => {

        //alert(cutout_directory.number_of_images)
        // dispatch current observation to the global store
        //my_dispatch({type: SET_ACTIVE_OBSERVATION, current_cutout: cutout_directory})

    }

    // generate the details link to forward to
    const getLink = (taskID) => {
        let details_link = "/details/"+taskID
        return details_link
    }
    return (

        <Card className="card-img-cutout">
            <Card.Img variant top src={props.cutout.derived_url}
                      width="300" height="300" />

            <Card.ImgOverlay>
                <Link to={() => getLink(props.cutout.observation_taskID)}>
                    <Button variant="outline-warning" onClick={() => handleObservationClick(props.cutout.observation_taskID)}>{props.cutout.observation_taskID}</Button>&nbsp;
                </Link>
            </Card.ImgOverlay>

        </Card>

    );

}

