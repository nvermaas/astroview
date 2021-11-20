import React, {useState, useEffect }  from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

import { useGlobalReducer } from '../../contexts/GlobalContext';

import CutoutDirectories from './CutoutDirectories'
import CutoutImages from './CutoutImages'

export default function CutoutsPage(props) {

    return (
        <div className="App">

            <Container fluid>
                <Row>
                    <Col sm={2} md={2} lg={2}>
                        <Card>
                            <CutoutDirectories/>
                        </Card>
                   </Col>
                    <Col sm={10} md={10} lg={10}>
                        <Card>
                            <CutoutImages />
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}