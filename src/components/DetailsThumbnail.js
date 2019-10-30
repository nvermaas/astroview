import React from 'react';
import {Card, Button } from 'react-bootstrap'
import { Link } from "react-router-dom"

// display a single observation on a card
export default function DetailsThumbnail(props) {


    let title = props.observation.name
    // let thumbnail = props.observation.derived_raw_image
    let thumbnail = props.observation.derived_sky_plot_image
    let thumbnail_annotated = props.observation.derived_annotated_image


    return (

        <Card >
            <Card.Img variant top src={thumbnail} />

            <Card.ImgOverlay>
                <h2>{title}</h2>
            </Card.ImgOverlay>

        </Card>

    );

}


