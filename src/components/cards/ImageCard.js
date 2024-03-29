import React, { useContext, useState }  from 'react';
import {Card, Button, Table, Image } from 'react-bootstrap'
import { NavLink, Link } from "react-router-dom"
import { AuthContext } from '../../contexts/AuthContext'
import { useGlobalReducer } from '../../contexts/GlobalContext'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage, faArrowsAlt, faProjectDiagram, faGlobe, faStar, faSatellite,
faAdjust, faSlidersH, faRetweet, faMapMarkedAlt, faSquare, faMeteor} from '@fortawesome/free-solid-svg-icons'

import { SET_IMAGE_TYPE, ALADIN_RA, ALADIN_DEC, ALADIN_FOV, SET_CURRENT_OBSERVATION, ALADIN_MODE } from '../../reducers/GlobalStateReducer'
import {getUrlSDSS, ASTROBASE_URL, ALADIN_STARCHARTS_URL} from '../../utils/skyserver'

import AstroImage from "./AstroImage";
import InfoLink from '../buttons/InfoLink'
import SetQualityButton from '../buttons/SetQualityButton'
import SetHipsButton from '../buttons/SetHipsButton'
import SetAdminEditButton from '../buttons/SetAdminEditButton'
import DoCommandButton from '../buttons/DoCommandButton'

// display the main image depending on the dispatched imageType
function getThumbnail(observation, imageType) {
    let thumbnail =  observation.derived_raw_image

    // annotated quality means that there is probably no extra processed annotated image,
    // so show the raw image instead
    if ((imageType==='annotated_stars') && (observation.derived_annotated_stars_image===null)) {
        imageType = 'annotated'
    }

    if ((imageType==='annotated_grid') && (observation.derived_annotated_grid_image===null)) {
        imageType = 'annotated'
    }

    if ((imageType==='annotated_grid_eq') && (observation.derived_annotated_grid_eq_image===null)) {
        imageType = 'annotated'
    }

    if ((imageType==='annotated_transient') && (observation.derived_annotated_transient_image===null)) {
        imageType = 'annotated'
    }

    if ((imageType==='annotated_exoplanets') && (observation.derived_annotated_exoplanets_image===null)) {
        imageType = 'annotated'
    }

    if ((imageType==='annotated') && (observation.derived_annotated_image===null)) {
        imageType = 'raw'
    }

    if (imageType==='raw') {
        thumbnail = observation.derived_raw_image
    } else

    if (imageType==='annotated') {
        thumbnail = observation.derived_annotated_image
    } else

    if (imageType==='annotated_grid') {
        thumbnail = observation.derived_annotated_grid_image
    } else

    if (imageType==='annotated_grid_eq') {
        thumbnail = observation.derived_annotated_grid_eq_image
    } else

    if (imageType==='annotated_transient') {
        thumbnail = observation.derived_annotated_transient_image
    } else

    if (imageType==='annotated_exoplanets') {
        thumbnail = observation.derived_annotated_exoplanets_image
    } else

    if (imageType==='annotated_stars') {
        thumbnail = observation.derived_annotated_stars_image
    } else

    if (imageType==='SDSS') {
        thumbnail = getUrlSDSS(observation.field_ra, observation.field_dec, observation.field_fov, 600, 500, 'S')
    }
    return thumbnail
}



// display a single observation on a card
export default function ImageCard(props) {
    const STARCHARTS_URL = ASTROBASE_URL + 'create-starchart/'

    const [ my_state , my_dispatch] = useGlobalReducer()
    const { isAuthenticated } = useContext(AuthContext);
    const [ myImageClass , setMyImageClass] = useState([]);

    // dispatch current observation to the global store
    const setImageType = (observation,imageType) => {
        my_dispatch({type: SET_IMAGE_TYPE, image_type: imageType})
    }

    // dispatch current observation to the global store
    const setAladin = (ra, dec, fov, observation, mode) => {
        my_dispatch({type: ALADIN_RA, aladin_ra: ra.toString()})
        my_dispatch({type: ALADIN_DEC, aladin_dec: dec.toString()})
        my_dispatch({type: ALADIN_FOV, aladin_fov: fov.toString()})
        my_dispatch({type: ALADIN_MODE, aladin_mode: mode})
        my_dispatch({type: SET_CURRENT_OBSERVATION, current_observation: observation})
    }


    // display the main image
    function MainImage(props) {
        let thumbnail =  getThumbnail(props.observation, props.imageType)

        if (props.imageType == 'astro_image') {
            return <AstroImage observation={props.observation} />
        } else {
            return <a href={thumbnail} target="_blank"><img class={myImageClass} src={thumbnail} width="1000"/></a>
        }
    }

    let sdss_button=<Button variant="warning" onClick={() => setImageType(props.observation,'SDSS')}>SDSS</Button>

    // conditionally render the buttons if the underlying dataproduct exists

    let buttonRaw=''
    if (props.observation.derived_raw_image!==null) {
        buttonRaw = <Button variant="primary" onClick={() => setImageType(props.observation, "raw")}>
                        <FontAwesomeIcon icon={faImage} />&nbsp;Raw
                    </Button>
    }

    let buttonAstroImage=''
    if (props.observation.derived_fits!==null) {
        buttonAstroImage = <Button variant="primary" onClick={() => setImageType(props.observation, "astro_image")}>
            <FontAwesomeIcon icon={faImage} />&nbsp;Info
        </Button>
    }

    let buttonAnnotated=''
    if (props.observation.derived_annotated_image!==null) {
        buttonAnnotated = <Button variant="success" onClick={() => setImageType(props.observation, "annotated")}>
                        <FontAwesomeIcon icon={faProjectDiagram} />&nbsp;Annotated
            </Button>
    }

    let buttonAnnotatedGrid=''
    if (props.observation.derived_annotated_grid_image!==null) {
        buttonAnnotatedGrid = <Button variant="success" onClick={() => setImageType(props.observation, "annotated_grid")}>
            <FontAwesomeIcon icon={faGlobe} />&nbsp;Grid
        </Button>
    }

    let buttonAnnotatedGridEquatorial=''
    if (props.observation.derived_annotated_grid_eq_image!==null) {
        buttonAnnotatedGridEquatorial = <Button variant="success" onClick={() => setImageType(props.observation, "annotated_grid_eq")}>
            <FontAwesomeIcon icon={faGlobe} />&nbsp;EQ
        </Button>
    }

    let buttonAnnotatedTransient=''
    if (props.observation.derived_annotated_transient_image) {
        buttonAnnotatedTransient = <Button variant="success" onClick={() => setImageType(props.observation, "annotated_transient")}>
            <FontAwesomeIcon icon={faMeteor} />&nbsp;Transient
        </Button>
    }

    let buttonAnnotatedExoplanet
    if (props.observation.derived_annotated_exoplanets_image) {
        buttonAnnotatedExoplanet = <Button variant="success" onClick={() => setImageType(props.observation, "annotated_exoplanets")}>
            <FontAwesomeIcon icon={faSatellite} />&nbsp;Exo
        </Button>
    }

    let buttonAnnotatedStars=''
    if (props.observation.derived_annotated_stars_image!==null) {
        buttonAnnotatedStars = <Button variant="success" onClick={() => setImageType(props.observation, "annotated_stars")}>
            <FontAwesomeIcon icon={faStar} />&nbsp;Cal
        </Button>
    }

    let ra = (props.observation.ra_min + props.observation.ra_max) / 2
    let dec = (props.observation.dec_min + props.observation.dec_max) /2
    let fov = props.observation.field_fov
    //let url = STARCHARTS_URL + '?ra=' + ra.toString() + "&dec=" + dec.toString() + "&radius=" + radius.toString() + "&name="+props.observation.name
    let url = ALADIN_STARCHARTS_URL + 'starchart?ra=' + ra.toString() + "&dec=" + dec.toString() + "&fov=" + fov.toString()
        + "&name="+props.observation.name + "&extra="+props.observation.extra

    let buttonStarChart= <a href ={url} target="_blank">
        <Button variant="success" >
            <FontAwesomeIcon icon={faStar} />&nbsp;Chart
        </Button>
    </a>


    let buttonFITS=''
    if (props.observation.derived_fits!==null) {
        buttonFITS=<a href = {props.observation.derived_fits} target="_blank" rel="noopener noreferrer">
                <Button variant="info">FITS</Button>
            </a>
    }
/*
    let buttonJS9=''
    if (props.observation.derived_fits!==null) {
        // https://js9.si.edu/js9/js9.html?url=http://uilennest.net/astrobase/data/191231001/3836665.fits&colormap=heat&scale=log
        let link  = "https://js9.si.edu/js9/js9.html?url=" + props.observation.derived_fits + "&colormap=viridis&scale=log"
        buttonJS9=<a href = {link} target="_blank" rel="noopener noreferrer">
            <Button variant="info">JS9</Button>
        </a>
    }
*/
    // buttons to manipulate the colors
    let buttonNormal=''
    if (props.observation.derived_raw_image!==null) {
        buttonNormal = <Button variant="warning" onClick={() => setMyImageClass("image-normal")}>
            <FontAwesomeIcon icon={faImage} />&nbsp;
        </Button>
    }

    let buttonInvert=''
    if (props.observation.derived_raw_image!==null) {
        buttonInvert = <Button variant="warning" alt="Invert" onClick={() => setMyImageClass("image-invert")}>
            <FontAwesomeIcon icon={faRetweet} />&nbsp;
        </Button>
    }


    let buttonHueRotate=''
    if (props.observation.derived_raw_image!==null) {
        buttonHueRotate = <Button variant="warning" onClick={() => setMyImageClass("image-huerotate")}>
            <FontAwesomeIcon icon={faSlidersH} />&nbsp;
        </Button>
    }

    let buttonFullScreen=
        <a href = {getThumbnail(props.observation,my_state.image_type)} target="_blank" rel="noopener noreferrer">
            <Button variant="warning">
                <FontAwesomeIcon icon={faArrowsAlt} />&nbsp;Full Screen
            </Button>
        </a>

    let buttonAladinRectangle
    if (props.observation.used_in_hips) {
        buttonAladinRectangle = <Link to="/aladin">
            <Button variant="info"
                    onClick={() => setAladin(props.observation.field_ra, props.observation.field_dec, props.observation.field_fov * 2, props.observation, 'rectangle')}>
                <FontAwesomeIcon icon={faMapMarkedAlt}/>&nbsp;Aladin
            </Button>
        </Link>
    }

    let buttonAladin
    if (props.observation.used_in_hips) {
        buttonAladin = <Link to="/aladin">
            <Button variant="info"
                    onClick={() => setAladin(props.observation.field_ra, props.observation.field_dec, props.observation.field_fov * 2, props.observation, 'fits')}>
                <FontAwesomeIcon icon={faMapMarkedAlt}/>&nbsp;Fits
            </Button>
        </Link>
    }

    // the following only shows when the user is authenticated
    let renderQualityButtons
    if (isAuthenticated) {
        renderQualityButtons=<div>
            <SetQualityButton observation={props.observation} quality="great"/>&nbsp;
            <SetQualityButton observation={props.observation} quality="good"/>&nbsp;
            <SetQualityButton observation={props.observation} quality="medium"/>&nbsp;
            <SetQualityButton observation={props.observation} quality="bad"/>&nbsp;
            <SetQualityButton observation={props.observation} quality="annotated"/>&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;

        </div>
    }

    let renderTransientButton
    if (props.observation.transient) {
        renderTransientButton=<DoCommandButton observation={props.observation} title="Add Transient" command="transient"/>
    }


    let renderCommandButtons
    if (isAuthenticated) {
        renderCommandButtons=<div>
            <SetAdminEditButton observation={props.observation} />&nbsp;
            {renderTransientButton}&nbsp;
            <DoCommandButton observation={props.observation} title="Add Grid" command="grid" />&nbsp;
            <DoCommandButton observation={props.observation} title="Add EQ" command="grid_eq" />&nbsp;
            <DoCommandButton observation={props.observation} title="Add Stars" command="stars" />&nbsp;
            <DoCommandButton observation={props.observation} title="Add Exo" command="exoplanets" />&nbsp;
            <DoCommandButton observation={props.observation} title="Add Boxes" command="min_max" />&nbsp;
            <SetHipsButton observation={props.observation} use_in_hips={!props.observation.used_in_hips}/>&nbsp;
        </div>
    }

    let renderHipsButton
    if (isAuthenticated) {
        renderHipsButton=<div>
            <SetHipsButton observation={props.observation} use_in_hips={!props.observation.used_in_hips}/>&nbsp;
        </div>
    }

    return (
        <Card className="card-dataproduct">
            <Card.Body>
                <Table>
                <tr>
                    <h4><InfoLink observation={props.observation}/>&nbsp;{props.observation.description}</h4>
                    &nbsp;

                    {buttonRaw}&nbsp;
                    {buttonAnnotated}&nbsp;
                    {buttonAnnotatedGrid}&nbsp;
                    {buttonAnnotatedGridEquatorial}&nbsp;
                    {buttonAnnotatedStars}&nbsp;
                    {buttonStarChart}&nbsp;
                    {buttonAnnotatedTransient}&nbsp;
                    {buttonAnnotatedExoplanet}&nbsp;
                    {buttonAladinRectangle}&nbsp;
                    {buttonAladin}&nbsp;
                    {buttonNormal}&nbsp;
                    {buttonInvert}&nbsp;
                    {buttonHueRotate}&nbsp;
                </tr>
                &nbsp;
                <tr>
                    <MainImage observation={props.observation} imageType={my_state.image_type}/>
                </tr>
                </Table>
                (click for fullscreen)
                <h4>Commands</h4>
                {renderQualityButtons}&nbsp;
                {renderCommandButtons}
            </Card.Body>

        </Card>

    );

}


