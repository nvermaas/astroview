import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon, faStarAndCrescent, faStar, faWrench, faSatellite, faMeteor, faGlobe, faMap,
    faBolt, faQuestionCircle, faImage, faCloudMeatball, faSmog, faThumbsUp, faThumbsDown, faEdit }
    from '@fortawesome/free-solid-svg-icons'

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

    //if (observation.exposure_in_seconds>0) {
    //    mode = mode + ' ' + observation.exposure_in_seconds + 's'
    //}

    //if (observation.focal_length>0) {
    //    mode = mode + ' ' + observation.focal_length + 'mm'
    //}


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

export const getCommandIcon = (command) => {
    let icon = undefined
    let color = "darkgreen"
    let size = 'md'

    if (command === 'grid') {
        icon = faGlobe
        size = "lg"
        color = "green"
    }
    if (command === 'min_max') {
        icon = faMap
        color = "green"
    }
    if (command === 'stars') {
        icon = faStar
        color = "green"
    }
    return <FontAwesomeIcon size={size} icon={icon} color={color}/>
}