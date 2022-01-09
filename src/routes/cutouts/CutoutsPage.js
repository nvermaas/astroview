import React, {useState, useEffect }  from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { ASTROBASE_URL } from '../../utils/skyserver'
import { useGlobalReducer } from '../../contexts/GlobalContext';
import {
    SET_CUTOUT_PAGE,
} from '../../reducers/GlobalStateReducer';

import CutoutDirectories from './CutoutDirectories'
import CutoutImages from './CutoutImages'
import NewCutoutModalForm from './NewCutoutModalForm'

export default function CutoutsPage(props) {
    const [ my_state , my_dispatch] = useGlobalReducer()

    const handleClick = (page) => {
        my_dispatch({type: SET_CUTOUT_PAGE, cutout_page: page})
    }

    const handleNewCutout = () => {
        let name = window.prompt('Name')
        let ra = window.prompt('RA in degrees')
        let dec = window.prompt('dec in degrees')
        let fov = window.prompt('Field of View in degrees (1)', 1)
        let size = window.prompt('Cutout sizes in pixels (1000)', 1000)

        let params = ra + ',' + dec + ',' + fov + ',' + name + ',' + size
        let url_command = ASTROBASE_URL + "run-command?command=image_cutout&params=" + params

        if (window.confirm('Run this command to create the cutout?\n' + url_command)) {
            fetch(url_command)
        }
    }

    let renderPage


    if (my_state.cutout_page=='directories') {
        renderPage = <CutoutDirectories/>
    }

    if (my_state.cutout_page=='cutouts') {
        renderPage = <CutoutImages/>
    }

    return (
        <div className="App">

            <Container fluid>
                <Row>
                    <Button variant="primary" onClick={() => handleClick("directories")}>Directories</Button>&nbsp;
                    <Button variant="primary" onClick={() => handleClick("cutouts")}>Cutouts</Button>&nbsp;
                    <NewCutoutModalForm/>
                </Row>
                <Row>
                    <Col sm={12} md={12} lg={12}>
                        <Card>
                            {renderPage}
                        </Card>
                   </Col>
                </Row>
            </Container>
        </div>
    );
}