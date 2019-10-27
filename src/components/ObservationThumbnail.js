import React from 'react';
import {Card, Button } from 'react-bootstrap'

// display a single observation on a card
export default function ObservationThumbnail(props) {

    // this function is called when the presentation choice changes (gas, power, etc)
    const handleClick = (obs) => {
        // alert(obs.name)
        // dispatch current observation to the reducer (make reducer first)
        //... nah, better to fetch the dataproduct details in the detail screen.
        /*
          or else add this to the component
         <Button variant="info" onClick={() => handleClick(props.observation)}>{title}</Button>&nbsp;
         */
    }

    let title = props.observation.name
    let description = props.observation.description
    // let thumbnail = props.observation.derived_raw_image
    let thumbnail = props.observation.derived_sky_plot_image
    let thumbnail_raw = props.observation.derived_annotated_image
    let details_link = "/details/"+props.observation.taskID

    return (
        <a href={details_link}>
            <Card className="card-img-top">
                <Card.Img variant top src={thumbnail} onClick={handleClick}/>

                <Card.ImgOverlay>
                    <h2>{title}</h2>

                </Card.ImgOverlay>

            </Card>
        </a>

    );

}

