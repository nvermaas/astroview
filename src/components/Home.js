import React from 'react';
import stars from '../assets/astrobase.gif';

import { SET_FETCHED_OBSERVATIONS, SET_ACTIVE_TASKID} from '../reducers/GlobalStateReducer';
import { useGlobalReducer } from '../Store';

//const url = "http://uilennest.net:81/astrobase/observations"
const url = "http://localhost:8000/astrobase/observations"

export function Home() {

    // preload the observations


    return (
        <div className="App">
            <header className="App-header">
                <h1>
                    Explore Your Sky!
                </h1>

                <img src={stars} className="App-logo" alt="logo" />

                Your images automatically annotated with <a
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