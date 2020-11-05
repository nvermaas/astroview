import React, { useContext }  from 'react';
import {Card, Button } from 'react-bootstrap'

import { AuthContext } from '../../contexts/AuthContext'
import { useGlobalReducer } from '../../contexts/GlobalContext'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage, faArrowsAlt, faProjectDiagram } from '@fortawesome/free-solid-svg-icons'


import { SET_IMAGE_TYPE } from '../../reducers/GlobalStateReducer'
import { getUrlSDSS} from '../../utils/skyserver'

import InfoLink from '../buttons/InfoLink'
import SetQualityButton from '../buttons/SetQualityButton'

// display the main image depending on the dispatched imageType
function getThumbnail(observation, imageType) {
    let thumbnail =  observation.derived_raw_image

    // annotated quality means that there is probably no extra processed annotated image,
    // so show the raw image instead
    if (observation.derived_annotated_image==null) {
    //if (observation.quality == 'annotated') {
        imageType = 'raw'
    }

    if (imageType==='raw') {
        thumbnail = observation.derived_raw_image
    } else

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
    return <a href={thumbnail} target="_blank"><img src={thumbnail} width="1000"/></a>
}

// display a single observation on a card
export default function ImageCard(props) {

    const [ my_state , my_dispatch] = useGlobalReducer()
    const { isAuthenticated } = useContext(AuthContext);

    // dispatch current observation to the global store
    const handleClick = (observation,imageType) => {
        my_dispatch({type: SET_IMAGE_TYPE, image_type: imageType})
    }

    let sdss_button=<Button variant="warning" onClick={() => handleClick(props.observation,'SDSS')}>SDSS</Button>

    // conditionally render the buttons if the underlying dataproduct exists

    let buttonRaw=''
    if (props.observation.derived_raw_image!==null) {
        buttonRaw = <Button variant="primary" onClick={() => handleClick(props.observation, "raw")}>
                        <FontAwesomeIcon icon={faImage} />&nbsp;Original
                    </Button>
    }

    let buttonAnnotated=''
    if (props.observation.derived_annotated_image!==null) {
        buttonAnnotated = <Button variant="success" onClick={() => handleClick(props.observation, "annotated")}>
                        <FontAwesomeIcon icon={faProjectDiagram} />&nbsp;Annotated
            </Button>
    }

    let buttonRedGreen=''
    if (props.observation.derived_red_green_image!==null) {
        buttonRedGreen = <Button variant="success"
                                  onClick={() => handleClick(props.observation, "redgreen")}>Red/Green
        </Button>
    }

    let buttonFITS=''
    if (props.observation.derived_fits!==null) {
        buttonFITS=<a href = {props.observation.derived_fits} target="_blank" rel="noopener noreferrer">
                <Button variant="info">FITS (header)</Button>
            </a>
    }

    let buttonJS9=''
    if (props.observation.derived_fits!==null) {
        // https://js9.si.edu/js9/js9.html?url=http://uilennest.net/astrobase/data/191231001/3836665.fits&colormap=heat&scale=log
        let link  = "https://js9.si.edu/js9/js9.html?url=" + props.observation.derived_fits + "&colormap=viridis&scale=log"
        buttonJS9=<a href = {link} target="_blank" rel="noopener noreferrer">
            <Button variant="info">FITS viewer (JS9)</Button>
        </a>
    }


    let buttonFullScreen=
        <a href = {getThumbnail(props.observation,my_state.image_type)} target="_blank" rel="noopener noreferrer">
            <Button variant="warning">
                <FontAwesomeIcon icon={faArrowsAlt} />&nbsp;Full Screen
            </Button>
        </a>

    // the following only shows when the user is authenticated
    let renderQualityButton
    if (isAuthenticated) {
        renderQualityButton=<div>
            <SetQualityButton observation={props.observation} quality="great"/>&nbsp;
            <SetQualityButton observation={props.observation} quality="good"/>&nbsp;
            <SetQualityButton observation={props.observation} quality="medium"/>&nbsp;
            <SetQualityButton observation={props.observation} quality="bad"/>&nbsp;
            <SetQualityButton observation={props.observation} quality="annotated"/>&nbsp;
        </div>
    }

    return (
        <Card className="card-dataproduct">
            <Card.Body>

                <tr>
                    <h4><InfoLink observation={props.observation}/>&nbsp;{props.observation.description}</h4>
                    &nbsp;
                    {buttonRaw}&nbsp;
                    {buttonAnnotated}&nbsp;
                    {buttonFITS}&nbsp;
                    {buttonJS9}&nbsp;

                </tr>
                &nbsp;
                <tr>
                    <MainImage observation={props.observation} imageType={my_state.image_type}/>
                </tr>
                (click for fullscreen)
                {renderQualityButton}&nbsp;
            </Card.Body>

        </Card>

    );

}


