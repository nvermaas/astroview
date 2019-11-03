import React from 'react';
import architecture from '../assets/architecture.png';
export function About() {

    return (
        <div>
        <div>

            <p></p>
            <p>
                AstroView is a ReactJS frontend on top of the AstroBase backend. AstroView is served by an Apache2 webserver and runs in the browser. It communicates with the AstroBase backend through a REST API.
            </p>
            <p>
                The AstroBase backend is written in Django. It hosts a 'sqlite' database and serves it through a REST API. The backend runs in a Docker container on a Raspberry Pi and is served through an Nginx webserver running in the same Docker environment.
            </p>
            <p>
                'Below' the AstroBase backend is a configuration of 'services', pure Python programs that perform simple tasks depending on the status of observations in the database.
                The services layer runs on the file server. The images are served by a separate Apache2 webserver.
            </p>
            <p>
                One of the tasks is delivering the raw image to the 'astrometery.net' website for proper sky positioning and source extraction, after which the results are downloaded and stored on the file server and made accessable through the database, REST API and AstroView frontend.
            </p>
            <p>
                The raw images are jpg's made with a digital camera. They are copied to a 'landing_pad' directory, or uploaded through the REST API.
                Optionally a json file with the same name and some extra metadata can be copied with the image.
            </p>
            <p>
                Source code on
                <a className="App-link"
                   href="https://github.com/nvermaas/astroview"
                   target="_blank"
                   rel="noopener noreferrer"
                > github
                </a>
            </p>
        </div>
            <div  className="App">
            <header >
            <img alt='' src={architecture}  className="d-inline-block align-top"/>
            </header>
        </div>
            </div>
    );
}