import React from 'react';
import {Card, Button } from 'react-bootstrap'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage, faArrowsAlt, faProjectDiagram } from '@fortawesome/free-solid-svg-icons'

import { useGlobalReducer } from '../../Store';
import { SET_IMAGE_TYPE } from '../../reducers/GlobalStateReducer'

import { getUrlSDSS} from '../../utils/skyserver'

import Description from '../buttons/DescriptionButton'
import InfoLink from '../buttons/InfoLink'

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
    return <a href={thumbnail} target=""_blank><img src={thumbnail} width="650"/></a>
}

// display a single observation on a card
export default function ImageCard(props) {

    const [ my_state , my_dispatch] = useGlobalReducer()

    // dispatch current observation to the global store
    const handleClick = (observation,imageType) => {
        my_dispatch({type: SET_IMAGE_TYPE, image_type: imageType})
    }

    let sdss_button=<Button variant="warning" onClick={() => handleClick(props.observation,'SDSS')}>SDSS</Button>

    // conditionally render the buttons if the underlying dataproduct exists

    let buttonRaw=''
    if (props.observation.derived_raw_image!==undefined) {
        buttonRaw = <Button variant="primary" onClick={() => handleClick(props.observation, "raw")}>
                        <FontAwesomeIcon icon={faImage} />&nbsp;Original
                    </Button>
    }

    let buttonAnnotated=''
    if (props.observation.derived_annotated_image!==undefined) {
        buttonAnnotated = <Button variant="success" onClick={() => handleClick(props.observation, "annotated")}>
                        <FontAwesomeIcon icon={faProjectDiagram} />&nbsp;Annotated
            </Button>
    }

    let buttonRedGreen=''
    if (props.observation.derived_red_green_image!==undefined) {
        buttonRedGreen = <Button variant="success"
                                  onClick={() => handleClick(props.observation, "redgreen")}>Red/Green
        </Button>
    }

    let buttonFITS=''
    if (props.observation.derived_fits!==undefined) {
        buttonFITS=<a href = {props.observation.derived_fits} target="_blank" rel="noopener noreferrer">
                <Button variant="info">FITS</Button>
            </a>
    }

    let buttonFullScreen=
        <a href = {getThumbnail(props.observation,my_state.image_type)} target="_blank" rel="noopener noreferrer">
            <Button variant="warning">
                <FontAwesomeIcon icon={faArrowsAlt} />&nbsp;Full Screen
            </Button>
        </a>

    return (

        <Card className="card-dataproduct">
            <Card.Body>

                <tr>
                    <Description observation={props.observation}/>&nbsp;
                    <InfoLink observation={props.observation}/>&nbsp;
                    {buttonRaw}&nbsp;
                    {buttonAnnotated}&nbsp;
                    {buttonFITS}&nbsp;

                </tr>
                &nbsp;
                <tr>
                    <MainImage observation={props.observation} imageType={my_state.image_type}/>
                </tr>
                (click for fullscreen)
            </Card.Body>

        </Card>

    );

}


