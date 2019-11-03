import React from 'react';
import stars from '../assets/astrobase.gif';

// the Home page
export function Home() {

    return (
        <div className="App">
            <header className="App-header">
                <h2>
                    Explore Your Sky with AstroView
                </h2>
                <h4>yet another automated imaging pipeline.</h4>
                <img src={stars} className="App-logo" alt="logo" />

                <h5>Images automatically annotated with astrometry.net by</h5>
                <a
                    className="App-link"
                    href="http://uilennest.net:81/astrobase/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    AstroBase
                </a>
            </header>
        </div>
    );
}