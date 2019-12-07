import React from 'react';

export function About() {

    return (
        <div>
        <div>

            <p></p>
            <p>
                AstroView is a frontend web application for the
                <a className="App-link" href="http://uilennest.net:81/astrobase/" target="_blank" rel="noopener noreferrer"> AstroBase </a>
                backend. Written in ReactJS.
                It presents my Astrophotography projects to the web.
            </p>
            <p>
                <a className="App-link" href="http://uilennest.net:81/astrobase/" target="_blank" rel="noopener noreferrer"> AstroBase </a> is the backend processing pipeline and database. Written in django.
                It is controlled by a series of python programs (microservices) that guide raw images to astrometery.net and downloads 'registered' dataproducts.
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

            </div>
    );
}