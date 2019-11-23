import React from 'react';
import {Card, Image } from 'react-bootstrap'

// display a single observation on a card
export default function DetailsThumbnail(props) {

    let thumbnail_sky_plot = props.observation.derived_sky_plot_image
    let thumbnail_sky_globe = props.observation.derived_sky_globe_image

    return (

        <Card >
            <Image src={thumbnail_sky_globe}  fluid />
            &nbsp;
            <Card.Img variant top src={thumbnail_sky_plot} />

            <Card.ImgOverlay>

            </Card.ImgOverlay>

        </Card>

    );

}


