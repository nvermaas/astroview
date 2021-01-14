import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useGlobalReducer } from '../../contexts/GlobalContext';
import Pagination from "react-bootstrap/Pagination";

import { SET_OBSERVATION_PAGE } from '../../reducers/GlobalStateReducer'

import ObservationThumbnail from './ObservationThumbnail';

// loop through a list of observations and create a Card with a clickable thumbnail for all of them
export default function ObservationTiles(props) {
    const [ my_state , my_dispatch] = useGlobalReducer()

    const handlePageChange = (event) => {
        let page = event.target.innerText

        // a change in observation_page is used to trigger a new fetch,
        // see the useEffect in the Main.js how that is done.
        my_dispatch({type: SET_OBSERVATION_PAGE, observation_page: page})

    }

    let total = Math.round(my_state.total_observations / 25) + 1

    let active = my_state.observation_page;
    let items = [];
    for (let num = 1; num <= total; num++) {
        items.push(
            <Pagination.Item key={num} active={num === active}>
                {num}
            </Pagination.Item>
        );
    }

    return (
        <div>
            <Container fluid>
                <div>
                    <Pagination onClick={handlePageChange}>
                        {items}
                    </Pagination>
                 </div>
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
                <div>
                    <Pagination onClick={handlePageChange}>
                        {items}
                    </Pagination>
                </div>
            </Container>
        </div>
    );

}

