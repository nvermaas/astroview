import React, { useContext }  from 'react';
import {Card, Button } from 'react-bootstrap'
import { Link } from "react-router-dom"

import { useGlobalReducer } from '../../contexts/GlobalContext';
import { AuthContext } from '../../contexts/AuthContext'
import { SET_CURRENT_CUTOUT } from '../../reducers/GlobalStateReducer'

// display a single cutout directory on a card
export default function DirectoryThumbnail(props) {
    const [ my_state , my_dispatch] = useGlobalReducer()
    const { isAuthenticated } = useContext(AuthContext);

    const handleDetailsClick = (cutout_directory) => {
        my_dispatch({type: SET_CURRENT_CUTOUT, current_cutout: cutout_directory})
    }

    const handleReloadClick = (cutout_directory) => {
        alert('reload '+cutout_directory.directory)
    }

    const handleHideClick = (cutout_directory) => {
        alert('remove '+cutout_directory.directory)
    }


    let renderChangeButtons
    if (isAuthenticated) {
        renderChangeButtons = <div>
            <td>
                <Button variant="outline-warning" size="sm" onClick={() => handleReloadClick(props.cutout_directory)}>Rerun</Button>&nbsp;
            </td>
            <td>
                <Button variant="outline-danger" size="sm" onClick={() => handleHideClick(props.cutout_directory)}>Del</Button>&nbsp;
            </td>
        </div>
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
                    <Button variant="outline-warning" size="sm" onClick={() => handleDetailsClick(props.cutout_directory)}>Select</Button>&nbsp;
                </td>
                    {renderChangeButtons}
                </tr>
            </Card.ImgOverlay>

        </Card>

    );

}

