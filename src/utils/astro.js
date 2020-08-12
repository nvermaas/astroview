import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon, faStarAndCrescent, faStar, faWrench, faSatellite, faMeteor,
    faBolt, faQuestionCircle, faImage, faCloudMeatball, faSmog } from '@fortawesome/free-solid-svg-icons'

function padDigits(number, digits) {
  return Array(Math.max(digits - String(number).length + 1, 0)).join(0) + number;
}

// based on http://www.bdnyc.org/2012/10/decimal-deg-to-hms/
// tested with http://www.astrouw.edu.pl/~jskowron/ra-dec/
export function deg2HMS(ra) {
    var sign = ""
    if (ra < 0) {
      sign ="-"
      ra = -ra;
    }

    var raH = padDigits(parseInt(ra/15),2)
    var raM = padDigits(parseInt(((ra/15)-raH)*60),2)
    var raS =  padDigits((((((ra/15)-raH)*60)-raM)*60).toFixed(2),5)

    //var result = sign + raH +':'+ raM +":"+ raS
    var result = sign + raH +':'+ raM

    return result
}

export function deg2DMS(dec) {
  var sign = "+"
  if (dec < 0) {
    sign ="-"
    dec = -dec;
  }

  var deg = padDigits(parseInt(dec),2)
  var decM = padDigits(Math.abs(parseInt((dec-deg)*60)),2)
  var f = ((Math.abs((dec-deg)*60)-decM)*60)
  var f2 = f.toFixed(2)
  var s = padDigits(f2,5)
  //alert(s)
  var decS = padDigits(((Math.abs((dec-deg)*60)-decM)*60).toFixed(2),5)

  //var result = sign + deg +':'+ decM + ':' + decS
  var result = sign + deg +':'+ decM
  return result
}

// nv: 26april2018
// 212.83549 => 212:50:7.763
export function getRA(angle) {

    var sign = ""
    if (angle < 0) {
      sign ="-"
      angle = -angle;
    }
    var ra = angle;
    var totalSeconds = angle * 3600
    var degrees = Math.floor(angle)
    totalSeconds -= degrees * 3600;

    var minutes = Math.floor(totalSeconds / 60);
    totalSeconds -= minutes * 60;

    var ra = sign +degrees+':'+minutes+":"+totalSeconds
    return ra
}

export const getMode = (observation) => {
    let mode = ''

    let stacked = 1
    if (observation.stacked_images>0) {
        stacked = observation.stacked_images
    }
    mode = mode + stacked + ' x'


    if (observation.iso!="none") {
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

export const getIcon = (image_type) => {
    let icon = undefined
    if (image_type == 'moon') { icon = faMoon }
    if (image_type == 'solar system') { icon = faMeteor }
    if (image_type == 'stars wide angle') { icon = faStarAndCrescent }
    if (image_type == 'stars zoomed-in') { icon = faStar }
    if (image_type == 'deep sky') { icon = faSmog }
    if (image_type == 'spacecraft') { icon = faSatellite }
    if (image_type == 'scenery') { icon = faImage }
    if (image_type == 'technical') { icon = faWrench }
    if (image_type == 'event') { icon = faBolt }
    if (image_type == 'other') { icon = faQuestionCircle }
    return <FontAwesomeIcon icon={icon} color="darkblue"/>

}