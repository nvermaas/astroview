import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useGlobalReducer } from '../../contexts/GlobalContext';

import ImageThumbnail from './ImageThumbnail';

export default function ImageTiles(props) {
    const [ my_state , my_dispatch] = useGlobalReducer()

    return (
        <div>
            <header className="Observations-header">
            <Container fluid>
                <Row>
                    {
                    props.data.map((cutout) => {
                        return (
                            <Col lg={true}>
                                <ImageThumbnail key={cutout.filename} cutout = {cutout} />
                            </Col>
                        );
                    })
                    }
                </Row>
            </Container>
            </header>
        </div>
    );

}

