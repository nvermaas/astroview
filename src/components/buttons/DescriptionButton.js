import React, {useState } from 'react';
import {Button, Collapse } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'

// show the description as a collapsing text
export default function Description(props) {

    const [open, setOpen] = useState(false);

    // only show the info button when there is a description
    if (props.observation.description==='') {
        return null
    }

    return (
        <>
        <Button
            variant="outline-primary"
            onClick={() => setOpen(!open)}
            aria-controls="example-collapse-text"
            aria-expanded={open}

        >
            <FontAwesomeIcon icon={faInfoCircle} />
        </Button>
        <Collapse in={open}>
            <div id="example-collapse-text">
                <h5>{props.observation.description}</h5>
            </div>
        </Collapse>
        </>
    );
}

