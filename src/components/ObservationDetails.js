import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import {
    useParams
} from "react-router-dom";

// get the specific details
// https://reacttraining.com/react-router/web/example/url-params

export default function ObservationDetails(props) {
    // get the observation info from the global state.

    // fetch dataproducts of this taskid

    return (
        <div>
            <h2>Details {props.taskid}</h2>
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