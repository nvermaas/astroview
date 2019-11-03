import React, {useState } from 'react';
import {Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLink } from '@fortawesome/free-solid-svg-icons'

// show the description as a collapsing text
export default function InfoLink(props) {

    const [open, setOpen] = useState(false);

    // only show the info button when there is a description
    if (props.observation.url=='') {
        return null
    }

    return (
        <a href = {props.observation.url} target="_blank">
            <Button variant="outline-info"> <FontAwesomeIcon icon={faLink} /></Button>
        </a>
    );
}

