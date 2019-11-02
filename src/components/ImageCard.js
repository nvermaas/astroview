import React from 'react';
import {Card, Button, Row } from 'react-bootstrap'
import { Link } from "react-router-dom"

import { useGlobalReducer } from '../Store';
import { SET_IMAGE_TYPE } from '../reducers/GlobalStateReducer'

import { getUrlAladin, getUrlSDSS} from '../utils/skyserver'
import { url } from './Main'



// display the main image depending on the dispatched imageType
function getThumbnail(observation, imageType) {
    let thumbnail =  observation.derived_raw_image
    if (imageType==='annotated') {
        thumbnail = observation.derived_annotated_image
    } else
    if (imageType==='redgreen') {
        thumbnail = observation.derived_red_green_image
    } else
    if (imageType==='SDSS') {
        thumbnail = getUrlSDSS(observation.field_ra, observation.field_dec, observation.field_fov, 600, 500, 'S')
    }
    return thumbnail
}

// display the main image
function MainImage(props) {
    let thumbnail =  getThumbnail(props.observation, props.imageType)
    return <img src={thumbnail} width="650"/>
}

// display a single observation on a card
export default function ImageCard(props) {

    const [ my_state , my_dispatch] = useGlobalReducer()

    // dispatch current observation to the global store
    const handleClick = (observation,imageType) => {
        my_dispatch({type: SET_IMAGE_TYPE, image_type: imageType})
    }

    // generate the details link to forward to
    const getLink = (observation) => {
        let link = props.observation.derived_raw_image
        return link
    }

    let title = props.observation.name
    let sdss_button=<Button variant="warning" onClick={() => handleClick(props.observation,'SDSS')}>SDSS</Button>
    let api = url + '/' + props.observation.id.toString()

    return (

        <Card className="card-dataproduct">
            <Card.Body>
                <tr>
                    <MainImage observation={props.observation} imageType={my_state.image_type}/>
                </tr>
                &nbsp;
                <tr>
                    <Button variant="primary" onClick={() => handleClick(props.observation,'raw')}>RAW</Button>&nbsp;
                    <Button variant="success" onClick={() => handleClick(props.observation,"annotated")}>Annotated</Button>&nbsp;
                    <Button variant="success" onClick={() => handleClick(props.observation,'redgreen')}>Red/Green</Button>&nbsp;

                    <a href = {getThumbnail(props.observation,my_state.image_type)} target="_blank">
                        <Button variant="info">Full Screen</Button>&nbsp;
                    </a>

                </tr>
            </Card.Body>

        </Card>

    );

}


