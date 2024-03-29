import React from 'react';
import { useGlobalReducer } from '../contexts/GlobalContext';
import { Button, InputGroup, Dropdown, DropdownButton, FormControl, Row } from 'react-bootstrap';
import { getMode, getExposure, getImageTypeIcon, getQualityIcon } from '../utils/styling'
import CoordSearchButton from '../components/buttons/CoordSearchButton'
import ResetFilterButton from '../components/buttons/ResetFilterButton'
import SearchButton from '../components/buttons/SearchButton'
import SwitchViewButton from '../components/buttons/SwitchViewButton'
import SwitchThumbnailButton from '../components/buttons/SwitchThumbnailButton'

import {
    SET_OBSERVATION_QUALITY,
    SET_OBSERVATION_STATUS,
    SET_OBSERVATION_ISO,
    SET_OBSERVATION_FOCAL_LENGTH,
    SET_OBSERVATION_INSTRUMENT,
    SET_OBSERVATION_PAGE,
    SET_OBSERVATION_IMAGE_TYPE} from '../reducers/GlobalStateReducer'


// display a single observation on a card
export function ButtonBar() {
    const [my_state, my_dispatch] = useGlobalReducer()

    function ResetFilters() {
        my_dispatch({type: SET_OBSERVATION_IMAGE_TYPE, observation_image_type: "All"})
        my_dispatch({type: SET_OBSERVATION_QUALITY, observation_quality: "All"})
        my_dispatch({type: SET_OBSERVATION_STATUS, observation_status: "All"})
        my_dispatch({type: SET_OBSERVATION_ISO, observation_iso: "All"})
        my_dispatch({type: SET_OBSERVATION_INSTRUMENT, observation_instrument: "All"})
        my_dispatch({type: SET_OBSERVATION_FOCAL_LENGTH, observation_focal_length: "All"})
    }

    function handleImageType(image_type) {
        // a change in observation_image_type is used to trigger a new fetch,
        // see the useEffect in the Main.js how that is done.
        my_dispatch({type: SET_OBSERVATION_PAGE, observation_page: 1})
        my_dispatch({type: SET_OBSERVATION_IMAGE_TYPE, observation_image_type: image_type})
    }

    function handleQuality(quality) {
        // a change in observation_quality is used to trigger a new fetch,
        // see the useEffect in the Main.js how that is done.
        my_dispatch({type: SET_OBSERVATION_PAGE, observation_page: 1})
        my_dispatch({type: SET_OBSERVATION_QUALITY, observation_quality: quality})
    }


    function handleISO(iso) {
        my_dispatch({type: SET_OBSERVATION_ISO, observation_iso: iso})
    }

    function handleFocal(focal_length) {
        my_dispatch({type: SET_OBSERVATION_FOCAL_LENGTH, observation_focal_length: focal_length})
    }

    function handleInstrument(instrument) {
        my_dispatch({type: SET_OBSERVATION_INSTRUMENT, observation_instrument: instrument})
    }
    
    let image_type_title = "Image Type : "+my_state.observation_image_type
    let instrument_title = "Instrument : "+my_state.observation_instrument
    let iso_title = "ISO : "+my_state.observation_iso
    let quality_title = "Quality : "+my_state.observation_quality
    let focal_length_title = "F(mm) : "+my_state.observation_focal_length
    let status_title = "Status : "+my_state.observation_status

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

            <DropdownButton
                as={InputGroup.Prepend}
                variant="outline-secondary"
                title={quality_title}
                id="input-group-dropdown-1"
            >
                <Dropdown.Item onClick={(e) => handleQuality("All")}>All</Dropdown.Item>
                <Dropdown.Item onClick={(e) => handleQuality("Great,Good")}>{getQualityIcon('great')}{' '}Good & Great</Dropdown.Item>
                <Dropdown.Item onClick={(e) => handleQuality("Great")}>{getQualityIcon('great')}{' '}Great</Dropdown.Item>
                <Dropdown.Item onClick={(e) => handleQuality("Good")}>{getQualityIcon('good')}{' '}Good</Dropdown.Item>
                <Dropdown.Item onClick={(e) => handleQuality("Medium")}>{getQualityIcon('medium')}{' '}Medium</Dropdown.Item>
                <Dropdown.Item onClick={(e) => handleQuality("Bad")}>{getQualityIcon('bad')}{' '}Bad</Dropdown.Item>
                <Dropdown.Item onClick={(e) => handleQuality("Annotated")}>{getQualityIcon('annotated')}{' '}Annotated</Dropdown.Item>

            </DropdownButton>

            <DropdownButton
                as={InputGroup.Prepend}
                variant="outline-secondary"
                title={instrument_title}
                id="input-group-dropdown-1"
            >
                <Dropdown.Item onClick={(e) => handleInstrument("All")}>All</Dropdown.Item>
                <Dropdown.Item onClick={(e) => handleInstrument("Powershot G2")}>Powershot G2</Dropdown.Item>
                <Dropdown.Item onClick={(e) => handleInstrument("Powershot G15")}>Powershot G15</Dropdown.Item>
                <Dropdown.Item onClick={(e) => handleInstrument("Canon 350D - Sigma 18-200")}>Canon 350D - Sigma 18-200</Dropdown.Item>
                <Dropdown.Item onClick={(e) => handleInstrument("Canon 2000D - Sigma 18-200")}>Canon 2000D - Sigma 18-200</Dropdown.Item>
                <Dropdown.Item onClick={(e) => handleInstrument("Canon 2000D - Samyang 135")}>Canon 2000D - Samyang 135</Dropdown.Item>
            </DropdownButton>

            <DropdownButton
                as={InputGroup.Prepend}
                variant="outline-secondary"
                title={iso_title}
                id="input-group-dropdown-1"
            >
                <Dropdown.Item onClick={(e) => handleISO("All")}>All</Dropdown.Item>
                <Dropdown.Item onClick={(e) => handleISO("100")}>ISO 100</Dropdown.Item>
                <Dropdown.Item onClick={(e) => handleISO("200")}>ISO 200</Dropdown.Item>
                <Dropdown.Item onClick={(e) => handleISO("400")}>ISO 400</Dropdown.Item>
                <Dropdown.Item onClick={(e) => handleISO("800")}>ISO 800</Dropdown.Item>
                <Dropdown.Item onClick={(e) => handleISO("1600")}>ISO 1600</Dropdown.Item>
                <Dropdown.Item onClick={(e) => handleISO("3200")}>ISO 3200</Dropdown.Item>
                <Dropdown.Item onClick={(e) => handleISO("6400")}>ISO 6400</Dropdown.Item>
            </DropdownButton>
            
            <DropdownButton
                as={InputGroup.Prepend}
                variant="outline-secondary"
                title={focal_length_title}
                id="input-group-dropdown-1"
            >
                <Dropdown.Item onClick={(e) => handleFocal("All")}>All</Dropdown.Item>
                <Dropdown.Item onClick={(e) => handleFocal("0")}>Unknown</Dropdown.Item>
                <Dropdown.Item onClick={(e) => handleFocal("10")}>10mm</Dropdown.Item>
                <Dropdown.Item onClick={(e) => handleFocal("18")}>18mm</Dropdown.Item>
                <Dropdown.Item onClick={(e) => handleFocal("30")}>30mm</Dropdown.Item>
                <Dropdown.Item onClick={(e) => handleFocal("50")}>50mm</Dropdown.Item>
                <Dropdown.Item onClick={(e) => handleFocal("100")}>100mm</Dropdown.Item>
                <Dropdown.Item onClick={(e) => handleFocal("135")}>135mm</Dropdown.Item>
                <Dropdown.Item onClick={(e) => handleFocal("200")}>200mm</Dropdown.Item>
                <Dropdown.Item onClick={(e) => handleFocal(">=135")}>>=135mm</Dropdown.Item>
            </DropdownButton>

            {render_backend_filter}


            &nbsp;
            <SwitchViewButton/>
            &nbsp;
            <SwitchThumbnailButton/>
            <CoordSearchButton/>
            <ResetFilterButton/>
            <SearchButton/>
        </InputGroup>

    );
}