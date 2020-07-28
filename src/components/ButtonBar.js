import React from 'react';
import { useGlobalReducer } from '../Store';
import { Button, InputGroup, Dropdown, DropdownButton, FormControl } from 'react-bootstrap';

import { SET_OBSERVATION_MODE, SET_OBSERVATION_QUALITY, SET_OBSERVATION_STATUS } from '../reducers/GlobalStateReducer'

// display a single observation on a card
export function ButtonBar() {

    function handleMode(mode) {
        // a change in observation_quality is used to trigger a new fetch,
        // see the useEffect in the Main.js how that is done.
        my_dispatch({type: SET_OBSERVATION_MODE, observation_mode: mode})
    }

    function handleQuality(quality) {
        // a change in observation_quality is used to trigger a new fetch,
        // see the useEffect in the Main.js how that is done.
        my_dispatch({type: SET_OBSERVATION_QUALITY, observation_quality: quality})
    }

    function handleStatus(status) {
        // a change in observation_quality is used to trigger a new fetch,
        // see the useEffect in the Main.js how that is done.
        my_dispatch({type: SET_OBSERVATION_STATUS, observation_status: status})
    }

    const [my_state, my_dispatch] = useGlobalReducer()

    let mode_title = "Mode : "+my_state.observation_mode
    let quality_title = "Quality : "+my_state.observation_quality
    let status_title = "Status : "+my_state.observation_status

    return (

        <InputGroup className="mb-3">
            <DropdownButton
                as={InputGroup.Prepend}
                variant="outline-secondary"
                title={mode_title}
                id="input-group-dropdown-1"
            >
                <Dropdown.Item onClick={(e) => handleMode("All")}>All</Dropdown.Item>
                <Dropdown.Item onClick={(e) => handleMode("proc_stacked")}>proc_stacked</Dropdown.Item>
                <Dropdown.Item onClick={(e) => handleMode("proc_single")}>proc_single</Dropdown.Item>
                <Dropdown.Item onClick={(e) => handleMode("raw_single")}>raw_single</Dropdown.Item>
                <Dropdown.Item onClick={(e) => handleMode("Wild")}>Wild</Dropdown.Item>
                <Dropdown.Item onClick={(e) => handleMode("Simulation")}>Simulation</Dropdown.Item>
                <Dropdown.Item onClick={(e) => handleMode("unknown")}>unknown</Dropdown.Item>
            </DropdownButton>

            <DropdownButton
                as={InputGroup.Prepend}
                variant="outline-secondary"
                title={quality_title}
                id="input-group-dropdown-1"
            >
                <Dropdown.Item onClick={(e) => handleQuality("All")}>All</Dropdown.Item>
                <Dropdown.Item onClick={(e) => handleQuality("Great")}>Great</Dropdown.Item>
                <Dropdown.Item onClick={(e) => handleQuality("Good")}>Good</Dropdown.Item>
                <Dropdown.Item onClick={(e) => handleQuality("Medium")}>Medium</Dropdown.Item>
                <Dropdown.Item onClick={(e) => handleQuality("Bad")}>Bad</Dropdown.Item>
                <Dropdown.Item onClick={(e) => handleQuality("Simulated")}>Simulated</Dropdown.Item>
            </DropdownButton>
            <DropdownButton
                as={InputGroup.Prepend}
                variant="outline-secondary"
                title={status_title}
                id="input-group-dropdown-1"
            >
                <Dropdown.Item onClick={(e) => handleStatus("All")}>All</Dropdown.Item>
                <Dropdown.Item onClick={(e) => handleStatus("Done")}>Done</Dropdown.Item>
                <Dropdown.Item onClick={(e) => handleStatus("Raw")}>Raw</Dropdown.Item>
                <Dropdown.Item onClick={(e) => handleStatus("Master")}>Master</Dropdown.Item>
            </DropdownButton>

            <FormControl aria-describedby="basic-addon1" />

        </InputGroup>


    );
}