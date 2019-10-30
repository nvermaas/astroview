import React, { useReducer, useContext }  from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import { useGlobalReducer } from '../Store';
import { SET_ACTIVE_TASKID } from '../reducers/GlobalStateReducer'
// get the specific details
// https://reacttraining.com/react-router/web/example/url-params

export default function ObservationDetails(props) {

    // get the observation info from the global state.
    const [ my_state , my_dispatch] = useGlobalReducer()
    //alert(props.taskid)
    // alert(my_state.observation['name'])

    return (

        <div>
            <h2>Details {props.taskid} </h2>

            <Container>
                {my_state.taskid}
                <button onClick={() => my_dispatch({type: "SET_ACTIVE_TASKID", taskid: "666"})}>
                    666
                </button>
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