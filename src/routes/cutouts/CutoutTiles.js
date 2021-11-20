import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useGlobalReducer } from '../../contexts/GlobalContext';

import CutoutDirectoryThumbnail from './CutoutDirectoryThumbnail';

// loop through a list of observations and create a Card with a clickable thumbnail for all of them
export default function CutoutTiles(props) {
    const [ my_state , my_dispatch] = useGlobalReducer()

    return (
        <div>
            <header className="Observations-header">
            <Container fluid>
                <Row>
                    {
                        props.data.map((cutout_directory) => {
                            return (
                                <Col lg={true}>
                                    <CutoutDirectoryThumbnail key={cutout_directory.directory} cutout_directory = {cutout_directory} />
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

