import React from 'react';
import { useGlobalReducer } from '../contexts/GlobalContext';
import { Button, InputGroup, Dropdown, DropdownButton, FormControl } from 'react-bootstrap';
import { getMode, getExposure, getImageTypeIcon, getQualityIcon } from '../utils/styling'

import {
    SET_OBSERVATION_QUALITY,
    SET_OBSERVATION_STATUS,
    SET_OBSERVATION_ISO,
    SET_OBSERVATION_FOCAL_LENGTH,
    SET_OBSERVATION_PAGE,
    SET_OBSERVATION_IMAGE_TYPE} from '../reducers/GlobalStateReducer'


// display a single observation on a card
export function ButtonBarCollections() {
    const [my_state, my_dispatch] = useGlobalReducer()

    function ResetFilters() {
        my_dispatch({type: SET_OBSERVATION_IMAGE_TYPE, observation_image_type: "All"})
    }

    function handleImageType(image_type) {
        // a change in observation_image_type is used to trigger a new fetch,
        // see the useEffect in the Main.js how that is done.

        my_dispatch({type: SET_OBSERVATION_IMAGE_TYPE, observation_image_type: image_type})
    }

    let image_type_title = "Type : "+my_state.observation_image_type

    let backend_filter
    let render_backend_filter
    if (my_state.backend_filter) {
        backend_filter="filter : " + my_state.backend_filter.split('&fieldsearch=')[1]

        render_backend_filter = <DropdownButton as={InputGroup.Prepend} variant="outline-secondary" title={backend_filter}>
            {backend_filter}
        </DropdownButton>
    }

    return (

        <InputGroup className="mb-3">
            <DropdownButton
                as={InputGroup.Prepend}
                variant="outline-secondary"
                title={image_type_title}
                id="input-group-dropdown-1"
            >
                <Dropdown.Item onClick={(e) => handleImageType("All")}>All</Dropdown.Item>
                <Dropdown.Item onClick={(e) => handleImageType("solar system")}>{getImageTypeIcon('solar system')}{' '}Solar System</Dropdown.Item>
                <Dropdown.Item onClick={(e) => handleImageType("stars wide angle")}>{getImageTypeIcon('stars wide angle')}{' '}Stars (wide angle)</Dropdown.Item>
                <Dropdown.Item onClick={(e) => handleImageType("stars zoomed-in")}>{getImageTypeIcon('stars zoomed-in')}{' '}Stars (zoomed-in)</Dropdown.Item>
                <Dropdown.Item onClick={(e) => handleImageType("deep sky")}>{getImageTypeIcon('deep sky')}{' '}Deep Sky</Dropdown.Item>
                <Dropdown.Item onClick={(e) => handleImageType("moon")}>{getImageTypeIcon('moon')}{' '}Moon</Dropdown.Item>
                <Dropdown.Item onClick={(e) => handleImageType("spacecraft")}>{getImageTypeIcon('spacecraft')}{' '}Spacecraft</Dropdown.Item>
                <Dropdown.Item onClick={(e) => handleImageType("scenery")}>{getImageTypeIcon('scenery')}{' '}Scenery</Dropdown.Item>
                <Dropdown.Item onClick={(e) => handleImageType("technical")}>{getImageTypeIcon('technical')}{' '}Technical</Dropdown.Item>
                <Dropdown.Item onClick={(e) => handleImageType("event")}>{getImageTypeIcon('event')}{' '}Event</Dropdown.Item>
                <Dropdown.Item onClick={(e) => handleImageType("other")}>{getImageTypeIcon('other')}{' '}Other</Dropdown.Item>
            </DropdownButton>

            {render_backend_filter}


            <FormControl aria-describedby="basic-addon1" />

        </InputGroup>

    );
}