import React from 'react';
import { Button } from 'react-bootstrap';
import { useLocation } from "react-router-dom"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'

import { ASTROBASE_URL } from '../../utils/skyserver'
import { url_admin } from '../../FetchData'

const url_quality = ASTROBASE_URL + "observations"

export default function SetAdminEditButton(props) {

    let admin_api = url_admin + '/' + props.observation.id.toString() + '/change/'

return <a href={admin_api} target="_blank" rel="noopener noreferrer">
    <Button variant="outline-info" ><FontAwesomeIcon icon={faEdit} />Edit</Button>
</a>
}