import React, { useReducer, useContext }  from 'react';
import { Container, Row, Col, Card, Table } from 'react-bootstrap';

import { useGlobalReducer } from '../Store';
import { deg2HMS, deg2DMS} from '../utils/astro'
import { getUrlAladin, getUrlESASky, getUrlSDSS} from '../utils/skyserver'
import DetailsThumbnail from './DetailsThumbnail'
import ImageCard from './ImageCard'

export default function ObservationDetails(props) {

    // get the observation info from the global state.
    const [ my_state , my_dispatch] = useGlobalReducer()


    function findElement(arr, propName, propValue) {
        for (var i=0; i < arr.length; i++)
            if (arr[i][propName] == propValue)
                return arr[i];
    }

    if (my_state.status == 'unfetched') {
        return null
    }

    // find the current observation in the fetched observations by taskID
    let observation = findElement(my_state.fetched_observations,"taskID",props.taskid)
    let astrometryLink = "http://nova.astrometry.net/status/"+observation.job

    let fov = parseFloat(observation.field_fov) * 3
    if (fov == 0) {
        fov = 60
    }

    let url_aladin = getUrlAladin(observation.field_ra,observation.field_dec,observation.field_fov,"DSS Colored")
    let sdss_image = getUrlSDSS(observation.field_ra.RA, observation.field_dec, observation.field_fov, 300, 300, 'S')
    let url_esa_sky = getUrlESASky(observation.field_ra,observation.field_dec,"J2000",fov,"DSS2 color")

    return (

        <div>
            <h2>{observation.name} </h2>

            <Container fluid>

                <Row>
                    <Col sm={3} md={3}>

                        <Card>
                            <DetailsThumbnail key={observation.taskID} observation = {observation} />
                        </Card>
                            <Card>
                            <Table striped bordered condensed hover>
                                <tbody>
                                <tr>
                                    <td className="key">RA {deg2HMS(observation.field_ra)} H</td>
                                    <td className="value">dec {deg2DMS(observation.field_dec)} deg</td>
                                </tr>

                                <tr>
                                    <td className="key">Field of View</td>
                                    <td className="value">{fov}</td>
                                </tr>
                                <tr>
                                    <td className="key">Date</td>
                                    <td className="value">{observation.date}</td>
                                </tr>
                                <tr>
                                    <td className="key">Links</td>
                                    <td className="value"><a href={url_esa_sky} target="_blank">ESA</a></td>
                                </tr>

                                <tr>
                                    <td className="key">Quality</td>
                                    <td className="value">{observation.quality}</td>
                                </tr>
                                <tr>
                                    <td className="key">Astrometry Job</td>
                                    <td className="value"><a href={astrometryLink} target="_blank">{observation.job}</a></td>
                                </tr>

                                </tbody>
                            </Table>

                        </Card>
                    </Col>
                    <Col sm={9} md={9}>
                        <Card>

                            <ImageCard key={observation.taskID} observation = {observation} />
                        </Card>
                    </Col>
                </Row>
                <img src={observation.derived_sky_globe_image} width="200"/>

            </Container>

        </div>
    );
}