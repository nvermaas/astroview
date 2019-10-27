import React from 'react';
import {Card } from 'react-bootstrap'

// display a single observation on a card
export default function ObservationThumbnail(props) {

    let title = props.observation.name
    let description = props.observation.description
    // let thumbnail = props.observation.derived_raw_image
    let thumbnail = props.observation.derived_sky_plot_image
    let thumbnail_raw = props.observation.derived_annotated_image
    return (
        <a href={thumbnail_raw} >
            <Card className="card-img-top">
                <Card.Img variant top src={thumbnail} />
                <Card.ImgOverlay>
                    <h2>{title}</h2>

                </Card.ImgOverlay>

            </Card>
        </a>

    );

}

