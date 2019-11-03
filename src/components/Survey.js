
import React from 'react';

import { useGlobalReducer } from '../Store';

// display the main image
function MOC(props) {
    // http://uilennest.net/astrobase/hips/
    let thumbnail =  "http://uilennest.net/astrobase/hips/moc.png"
    return <img src={thumbnail} width="600"/>
}

export default function Survey(props) {

    const [ my_state , my_dispatch] = useGlobalReducer()

    return (
        <div className="App">
            <header className="Observations-header">
                <h2>HiPS / MOC Survey</h2>
                <h4>Under construction</h4>
                <MOC/>
            </header>
        </div>
    );
}