import React, { useContext }  from 'react';
import {Card, Button } from 'react-bootstrap'
import { Link } from "react-router-dom"

import { useGlobalReducer } from '../../contexts/GlobalContext';
import { AuthContext } from '../../contexts/AuthContext'
import { ASTROBASE_URL } from '../../utils/skyserver'
import { SET_CURRENT_CUTOUT, SET_FETCHED_CUTOUTS } from '../../reducers/GlobalStateReducer'

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

    const handleRemoveClick = (cutout_directory) => {

        if (window.confirm('Remove this cutout and all its images from the database? \n(warning: files are not removed from the file system)')) {
            let directory = cutout_directory.directory

            // remove this image from the list of fetched images
            let index = searchDirectoryIndex(directory, my_state.fetched_cutouts);

            let fetched_cutouts = my_state.fetched_cutouts
            fetched_cutouts.splice(index,1)
            my_dispatch({type: SET_FETCHED_CUTOUTS, fetched_cutouts: fetched_cutouts})

            // abuse GET to call a backend command to set the thumbnail
            let url = ASTROBASE_URL + "cutout_directories" + '/' + directory + '/remove'
            fetch(url)

            // trigger the rendering of the cutout directory thumbnail
            my_dispatch({type: SET_CURRENT_CUTOUT, current_cutout: undefined})
        }
    }

    function searchDirectoryIndex(nameKey, myArray){
        for (var i=0; i < myArray.length; i++) {
            if (myArray[i].directory === nameKey) {
                return i;
            }
        }
    }

    let renderChangeButtons
    if (isAuthenticated) {
        renderChangeButtons = <div>
            <td>
                <Button variant="outline-warning" size="sm" onClick={() => handleReloadClick(props.cutout_directory)}>Rerun</Button>&nbsp;
            </td>
            <td>
                <Button variant="outline-danger" size="sm" onClick={() => handleRemoveClick(props.cutout_directory)}>Del</Button>&nbsp;
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

