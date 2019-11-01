import React from 'react';
import {Card, Button, Row } from 'react-bootstrap'
import { Link } from "react-router-dom"

import { useGlobalReducer } from '../Store';
import { SET_IMAGE_TYPE } from '../reducers/GlobalStateReducer'

import { getUrlAladin, getUrlSDSS} from '../utils/skyserver'
import { url } from './Main'

// display a single observation on a card
export default function ImageCard(props) {

    const [ my_state , my_dispatch] = useGlobalReducer()

    const handleClick = (observation,imageType) => {
        // dispatch current observation to the global store
        my_dispatch({type: SET_IMAGE_TYPE, image_type: imageType})

    }

    // generate the details link to forward to
    const getLink = (observation) => {
        let link = props.observation.derived_raw_image
        return link
    }

    let title = props.observation.name

    let thumbnail = props.observation.derived_raw_image

    if (my_state.image_type==='annotated') {
        thumbnail = props.observation.derived_annotated_image
    }
    if (my_state.image_type==='redgreen') {
        thumbnail = props.observation.derived_red_green_image
    }
    if (my_state.image_type==='SDSS') {
        thumbnail = getUrlSDSS(props.observation.field_ra, props.observation.field_dec, props.observation.field_fov, 600, 500, 'S')
    }
    let sdss_button=<Button variant="warning" onClick={() => handleClick(props.observation,'SDSS')}>SDSS</Button>

    let api = url + '/' + props.observation.id.toString()

    return (

        <Card className="card-dataproduct">
            <Card.Body>
                <tr>
                <img src={thumbnail} width="650"/>
                </tr>
                &nbsp;
                <tr>
                    <Button variant="primary" onClick={() => handleClick(props.observation,'raw')}>RAW</Button>&nbsp;
                    <Button variant="success" onClick={() => handleClick(props.observation,"annotated")}>Annotated</Button>&nbsp;
                    <Button variant="success" onClick={() => handleClick(props.observation,'redgreen')}>Red/Green</Button>&nbsp;

                    <a href = {thumbnail} target="_blank">
                        <Button variant="info">Full Screen</Button>&nbsp;
                    </a>

                </tr>
            </Card.Body>

        </Card>

    );

}


