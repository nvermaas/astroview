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

    const handleReRunClick = (cutout_directory) => {
        let params = cutout_directory.directory.replace(/_/g, ',')
        let url_remove = ASTROBASE_URL + "cutout_directories" + '/' + cutout_directory.directory + '/remove'
        let url_command = ASTROBASE_URL + "run-command?command=image_cutout&params=" + params

        if (window.confirm('Rerun the commands to generate the cutout images for this area?\n\n'+url_remove+'\n\n'+url_command)) {
           fetch(url_remove)
                .then(results => {
                    fetch(url_command)
                })
        }
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
                <Button variant="outline-warning" size="sm" onClick={() => handleReRunClick(props.cutout_directory)}>Rerun</Button>&nbsp;
            </td>
            <td>
                <Button variant="outline-danger" size="sm" onClick={() => handleRemoveClick(props.cutout_directory)}>Del</Button>&nbsp;
            </td>
        </div>
    }

    return (

        <Card className="card-img-cutout-dir" >
            <Card.Img variant top src={props.cutout_directory.thumbnail}
                      width="270" height="270" />

            <Card.ImgOverlay>
                <h4>{props.cutout_directory.field_name}</h4>
                <h6>{props.cutout_directory.field_ra},{props.cutout_directory.field_dec} ({props.cutout_directory.field_fov} deg)</h6>
                &nbsp;
                &nbsp;
                &nbsp;
                <tr></tr>
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

