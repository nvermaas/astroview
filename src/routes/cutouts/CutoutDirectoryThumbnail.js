import React from 'react';
import {Card, Button } from 'react-bootstrap'
import { Link } from "react-router-dom"

import { useGlobalReducer } from '../../contexts/GlobalContext';
import { SET_CURRENT_CUTOUT } from '../../reducers/GlobalStateReducer'

// display a single cutout directory on a card
export default function CutoutDirectoryThumbnail(props) {
    const [ my_state , my_dispatch] = useGlobalReducer()

    const handleDetailsClick = (cutout_directory) => {

        alert(cutout_directory.number_of_images)
        // dispatch current observation to the global store
        my_dispatch({type: SET_CURRENT_CUTOUT, current_cutout: cutout_directory})

    }

    // generate the details link to forward to
    const getLink = (observation) => {
        let details_link = "/details/"+observation.taskID
        return details_link
    }
    return (

        <Card className="card-img-cutout-dir">
            <Card.Img variant top src={props.cutout_directory.thumbnail}
                      width="200" height="200" />

            <Card.ImgOverlay>
                <h4>{props.cutout_directory.field_name}</h4>
                <h5>{props.cutout_directory.directory}</h5>
                <Button variant="outline-warning" onClick={() => handleDetailsClick(props.cutout_directory)}>Details</Button>&nbsp;
            </Card.ImgOverlay>

        </Card>

    );

}

