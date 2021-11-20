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

    const handleBestClick = (directory,url) => {
        alert('add this url to default thumbnail of directory '+directory)
    }

    const handleHideClick = (filename) => {
        alert('hide or delete '+filename)
    }

    // generate the details link to forward to
    const getDetailsLink = (taskID) => {
        let details_link = "/details/"+taskID
        return details_link
    }


    return (

        <Card className="card-img-cutout">
            <a href = {props.cutout.derived_url} target="_blank" rel="noopener noreferrer">
                <img src={props.cutout.derived_url} width={300} height={300} />
            </a>


            <Card.ImgOverlay>
                <tr>

                <td>
                    <Link to={() => getDetailsLink(props.cutout.observation_taskID)}>
                        <Button variant="outline-warning" size="sm" onClick={() => handleDetailsClick(props.cutout.observation_taskID)}>{props.cutout.observation_taskID}</Button>&nbsp;
                    </Link>
                </td>
                <td>
                    <a href = {props.cutout.derived_url} target="_blank" rel="noopener noreferrer">
                        <Button variant="outline-warning" size="sm">Zoom</Button>&nbsp;
                    </a>
                </td>
                <td>
                    <Button variant="outline-warning" size="sm" onClick={() => handleBestClick(props.cutout.directory, props.cutout.derived_url)}>Best</Button>&nbsp;
                </td>
                <td>
                    <Button variant="outline-warning" size="sm" onClick={() => handleHideClick(props.cutout.filename)}>Hide</Button>&nbsp;
                </td>
                </tr>
            </Card.ImgOverlay>

        </Card>

    );

}

