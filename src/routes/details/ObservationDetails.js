import React from 'react';
import { Container, Row, Col, Card, Table } from 'react-bootstrap';

import { useGlobalReducer } from '../../contexts/GlobalContext';
import { deg2HMS, deg2DMS} from '../../utils/astro'
import { getExposure, getImageTypeIcon, getQualityIcon} from '../../utils/styling'
import { ASTROBASE_URL, getUrlAladin, getUrlESASky, getUrlSDSS, getUrlCDSPortal} from '../../utils/skyserver'
import {
    SET_CURRENT_PROJECT,
    SET_CURRENT_OBSERVATION
} from '../../reducers/GlobalStateReducer';

import DetailsThumbnail from './DetailsThumbnail'
import ImageCard from '../../components/cards/ImageCard'

import { url_observations } from '../../FetchData'

export default function ObservationDetails(props) {

    // get the observation info from the global state.
    const [ my_state , my_dispatch] = useGlobalReducer()


    function findElement(arr, propName, propValue) {
        for (var i=0; i < arr.length; i++)
            if (arr[i][propName] === propValue)
                return arr[i];
    }

    // if no data is given to the details screen, then dispatch the request for that data based on the taskid
    // this happens when the program is entered with a direct url like this: astroview/details/151008003
    if (props.data === undefined) {
        if (my_state.status ==="unfetched") {
            my_dispatch({type: SET_CURRENT_OBSERVATION, current_observation: props.taskid})
        }
        return null
    }

    /*
    // only continue when data is fetched
    if (my_state.status != 'fetched') {
        return null
    }
*/

    // find the current observation (taskid) in the data that was given as a property
    let observation = findElement(props.data,"taskID",props.taskid)
    if (observation==undefined) {
        // alert('shit')
        // this happens when the observation wasn't fetched yet... just return and wait for the update
        //my_dispatch({type: SET_CURRENT_OBSERVATION, current_observation: props.taskid})
        return null
    }

    // all should be well now, a valid observation loaded.

    let astrometryLink = "http://nova.astrometry.net/status/"+observation.job

    let fov = parseFloat(observation.field_fov) * 3
    if (fov === 0) {
        fov = 60
    }

    let mode = ''
    let stacked = 1
    if (observation.stacked_images>0) {
        stacked = observation.stacked_images
    }
    mode = mode + stacked + ' x'

    if (observation.iso!="none") {
        mode = mode + ' ISO' + observation.iso
    }

    if (observation.exposure_in_seconds>0) {
        mode = mode + ' ' + observation.exposure_in_seconds + 's'
    }

    if (observation.focal_length>0) {
       mode = mode + ' ' + observation.focal_length + 'mm'
    }


    // links to various datacenters
    let sdss_image = getUrlSDSS(observation.field_ra.RA, observation.field_dec, observation.field_fov, 300, 300, 'S')
    let url_esa_sky = getUrlESASky(observation.field_ra,observation.field_dec,"J2000",fov,"DSS2 color")
    let url_cds = getUrlCDSPortal(observation.field_ra,observation.field_dec)

    // link to AstroBase REST API
    let api = url_observations + '/' + observation.id.toString()

    let d = new Date(observation.date.toString());
    let date = d.toDateString()

    let my_status = ''
    if (observation.my_status!=='done') {
        my_status = ' ('+observation.my_status+')'
    }

    let magnitude = ''
    if (observation.magnitude) {
        magnitude = ' (magnitude: ' + observation.magnitude + ')'
    }

    let api_link = ASTROBASE_URL + "?search_box=" + observation.taskID.toString()

    return (

        <div>
            <tr>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<td><h2>{getImageTypeIcon(observation.image_type)}&nbsp;&nbsp;{observation.name} - {observation.field_name}</h2> </td></tr>
            <Container fluid>

                <Row>
                    <Col sm={3} md={3} lg={3}>

                        <Card>
                            <DetailsThumbnail key={observation.taskID} observation = {observation} />
                        </Card>
                            <Card>
                            <Table striped bordered hover size="sm">
                                <tbody>
                                <tr>
                                    <td className="key">Field</td>
                                    <td className="value">{observation.field_name}</td>
                                </tr>
                                <tr>
                                    <td className="key">Image</td>
                                    <td className="value">{getImageTypeIcon(observation.image_type)}&nbsp;&nbsp;{observation.image_type}</td>
                                </tr>
                                <tr>
                                    <td className="key">RA, dec</td>
                                    <td className="value">{deg2HMS(observation.field_ra)} {'H'}, {deg2DMS(observation.field_dec)} {'deg'}</td>
                                </tr>
                                <tr>
                                    <td className="key">Date</td>
                                    <td className="value">{date}</td>
                                </tr>
                                <tr>
                                    <td className="key">Mode</td>
                                    <td className="value">{mode}</td>
                                </tr>
                                <tr>
                                    <td className="key">Quality</td>
                                    <td className="value">{getQualityIcon(observation.quality)}&nbsp;&nbsp;{observation.quality}{magnitude}</td>
                                </tr>
                                <tr>
                                    <td className="key">Resource</td>
                                    <td className="value">
                                        <a href={url_esa_sky} target="_blank" rel="noopener noreferrer">ESA</a>&nbsp;
                                        <a href={url_cds} target="_blank" rel="noopener noreferrer">CDS</a>&nbsp;

                                    </td>
                                </tr>
                                <tr>
                                    <td className="key">Job</td>
                                    <td className="value"><a href={astrometryLink} target="_blank" rel="noopener noreferrer">{observation.job}</a>&nbsp;</td>

                                </tr>
                                <tr>
                                    <td className="key"><a href={api_link}>AstroBase</a></td>
                                    <td className="value"><a href={api} target="_blank" rel="noopener noreferrer">API</a>
                                    </td>
                                </tr>

                                </tbody>
                            </Table>

                        </Card>
                    </Col>
                    <Col sm={9} md={9} lg={9}>
                        <Card>
                            <ImageCard key={observation.taskID} observation = {observation} />
                        </Card>
                    </Col>

                </Row>

            </Container>

        </div>
    );
}