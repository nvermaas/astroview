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
                    <Col sm={12} md={12} lg={12}>
                        <Card>
                            <CutoutDirectories/>
                        </Card>
                   </Col>
                </Row>
                <Row>
                    <Col sm={12} md={12} lg={12}>
                        <Card>
                            <CutoutImages />
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}