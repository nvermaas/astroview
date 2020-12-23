import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon, faStar, faStarAndCrescent, faWrench, faSatellite, faMeteor, faGlobe, faMap,
    faBolt, faQuestionCircle, faImage, faCloudMeatball, faSmog, faThumbsUp, faThumbsDown, faEdit,
    faMapMarkedAlt }
    from '@fortawesome/free-solid-svg-icons'

import { faListAlt } from '@fortawesome/free-regular-svg-icons'

export const getMode = (observation) => {
    let mode = ''

    let stacked = 1
    if (observation.stacked_images>0) {
        stacked = observation.stacked_images
    }
    mode = mode + stacked + ' x'


    if (observation.iso!=="none") {
        mode = mode + ' ISO' + observation.iso
    }

    return mode
}

export const getExposure = (observation) => {
    let exposure = ''

    if (observation.exposure_in_seconds>0) {
        exposure = observation.exposure_in_seconds
    }
    if (observation.exposure_in_seconds<0) {
        exposure = "1/"+Math.abs(observation.exposure_in_seconds)
    }

    return exposure
}

export const getImageTypeIcon = (image_type) => {
    let icon = undefined
    if (image_type === 'moon') { icon = faMoon }
    if (image_type === 'solar system') { icon = faMeteor }
    if (image_type === 'stars wide angle') { icon = faStarAndCrescent }
    if (image_type === 'stars zoomed-in') { icon = faStar }
    if (image_type === 'deep sky') { icon = faSmog }
    if (image_type === 'spacecraft') { icon = faSatellite }
    if (image_type === 'scenery') { icon = faImage }
    if (image_type === 'technical') { icon = faWrench }
    if (image_type === 'event') { icon = faBolt }
    if (image_type === 'other') { icon = faQuestionCircle }
    return <FontAwesomeIcon icon={icon} color="darkblue"/>
}

export const getQualityIcon = (quality) => {
    let icon = undefined
    let color = "darkgreen"
    let size = 'md'

    if (quality === 'great') {
        icon = faThumbsUp
        size = "lg"
        color = "green"
    }
    if (quality === 'good') {
        icon = faThumbsUp
    }
    if (quality === 'medium') {
        icon = faThumbsDown
        color = "grey"
    }
    if (quality === 'bad') {
        icon = faThumbsDown
        color = 'darkgrey'
    }
    if (quality === 'annotated') {
        icon = faEdit
        color="darkblue"
    }
    return <FontAwesomeIcon size={size} icon={icon} color={color}/>
}

export const getStarsIcon = (stars) => {
    let icon = faStar
    let color = "darkgreen"
    let size = 'grey'

    if (stars) {
        icon = faStar
        size = "md"
        color = "green"
    } else {
        icon = ["far", "faStar"]
        size = "md"
        color="grey"
    }
    return <FontAwesomeIcon size={size} icon={icon} color={color}  />
}

export const getHipsIcon = (used_in_hips) => {
    let icon = faStar
    let color = "darkgreen"
    let size = 'grey'

    if (used_in_hips) {
        icon = faMapMarkedAlt
        size = "md"
        color = "green"
    } else {
        icon = ["far", "faMapMarkedAlt"]
        size = "md"
        color="grey"
    }
    return <FontAwesomeIcon size={size} icon={icon} color={color}  />
}

export const getDetailsIcon = (onClickFunction, observation) => {
    // the onClickFunction is a weird javascript way of providing the onClick eventhandler
    // as an argument. In the calling function, this eventhandler makes sure that the

    let icon = faListAlt
    let color = "darkgreen"
    let size = 'lg'
    return <FontAwesomeIcon onClick={() => onClickFunction(observation)} size={size} icon={icon} color={color}  />
}

export const getCommandIcon = (command) => {
    let icon = undefined
    let color = "darkgreen"
    let size = 'md'

    if (command === 'grid') {
        icon = faGlobe
        size = "lg"
        color = "green"
    }
    if (command === 'grid_eq') {
        icon = faGlobe
        size = "lg"
        color = "green"
    }
    if (command === 'min_max') {
        icon = faMapMarkedAlt
        color = "green"
    }
    if (command === 'stars') {
        icon = faStar
        color = "green"
    }
    if (command === 'hips') {
        icon = faGlobe
        color = "green"
    }
    return <FontAwesomeIcon size={size} icon={icon} color={color}/>
}