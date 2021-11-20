import React from 'react';
import {Card, Button } from 'react-bootstrap'
import { Link } from "react-router-dom"

import { useGlobalReducer } from '../../contexts/GlobalContext';
import { SET_CURRENT_CUTOUT } from '../../reducers/GlobalStateReducer'

// display a single cutout directory on a card
export default function DirectoryThumbnail(props) {
    const [ my_state , my_dispatch] = useGlobalReducer()

    const handleDetailsClick = (cutout_directory) => {
        my_dispatch({type: SET_CURRENT_CUTOUT, current_cutout: cutout_directory})
    }

    const handleHideClick = (filename) => {
        alert('hide or delete '+filename)
    }

    // generate the details link to forward to
    const getLink = (observation) => {
        let details_link = "/details/"+observation.taskID
        return details_link
    }
    return (

        <Card className="card-img-cutout-dir">
            <Card.Img variant top src={props.cutout_directory.thumbnail}
                      width="190" height="190" />

            <Card.ImgOverlay>
                <h4>{props.cutout_directory.field_name}</h4>
                <h6>{props.cutout_directory.directory}</h6>
                <tr>
                <td>
                    <Button variant="outline-warning" size="sm" onClick={() => handleDetailsClick(props.cutout_directory)}>Details</Button>&nbsp;
                </td>
                <td>
                    <Button variant="outline-warning" size="sm" onClick={() => handleHideClick(props.cutout.filename)}>Delete</Button>&nbsp;
                </td>
                </tr>
            </Card.ImgOverlay>

        </Card>

    );

}

