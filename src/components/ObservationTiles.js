import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import ObservationThumbnail from './ObservationThumbnail';

// loop through a list of observations and create a Card with a clickable thumbnail for all of them
export default function ObservationTiles(props) {

    return (
        <div>
            <Container fluid>
                <Row>
                    {
                        props.data.map((observation) => {
                            return (
                                <Col lg={true}>
                                    <ObservationThumbnail key={observation.taskID} observation = {observation} />
                                </Col>
                            );
                        })
                    }
                </Row>
            </Container>
        </div>
    );

}

