import React from 'react';

export function About() {

    return (
        <div>
            <h2>About AstroView</h2>
            <p>
                This is a 'technology demonstration' of using a ReactJS frontend on top of the AstroBase Django backend.
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
    );
}