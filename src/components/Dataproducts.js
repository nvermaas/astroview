import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

export default function Dataproducts() {
    return (
        <div>
            <h2>Dataproducts</h2>
            <Container>
                <Row>
                    <Col sm={8}>sm=8</Col>
                    <Col sm={4}>sm=4</Col>
                </Row>
                <Row>
                    <Col sm>sm=true</Col>
                    <Col sm>sm=true</Col>
                    <Col sm>sm=true</Col>
                </Row>
            </Container>
        </div>
    );
}