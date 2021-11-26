import React, {useState, useEffect }  from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

import { useGlobalReducer } from '../../contexts/GlobalContext';
import {
    SET_CUTOUT_PAGE,
} from '../../reducers/GlobalStateReducer';

import CutoutDirectories from './CutoutDirectories'
import CutoutImages from './CutoutImages'

export default function CutoutsPage(props) {
    const [ my_state , my_dispatch] = useGlobalReducer()
    const [ page , setPage] = useState("directories");

    const handleClick = (page) => {
        setPage(page)
        my_dispatch({type: SET_CUTOUT_PAGE, cutout_page: page})
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
                    <Button variant="outline-primary" onClick={() => handleClick("directories")}>Directories</Button>&nbsp;
                    <Button variant="outline-primary" onClick={() => handleClick("cutouts")}>Cutouts</Button>
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