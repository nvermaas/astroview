import React, {useState, useEffect }  from 'react';

import { useGlobalReducer } from '../../contexts/GlobalContext';
//import { samp } from '../../scripts/samp';

// https://medium.com/better-programming/4-ways-of-adding-external-js-files-in-reactjs-823f85de3668
// https://stackoverflow.com/questions/61912232/how-to-wrap-vanilla-javascript-functions-to-reactjs-without-major-modifications

// <script type="text/javascript" src="//code.jquery.com/jquery-1.12.1.min.js" charset="utf-8"></script>
// <script type="text/javascript" src="//aladin.u-strasbg.fr/AladinLite/api/v2/latest/aladin.min.js" charset="utf-8"></script>


export default function SampPage(props) {

    // this is a way to import a vanilla javascript script into a react component.
    // https://medium.com/better-programming/4-ways-of-adding-external-js-files-in-reactjs-823f85de3668
    useEffect(() => {
        alert('import script')
        const script = document.createElement('script');
        script.src = "../../scripts/samp.js";
        // script.src = "https://github.com/astrojs/sampjs/blob/master/samp.js"
        script.async = true;
        document.body.appendChild(script);
        return () => {
            document.body.removeChild(script);
        }
    }, []);

    const [ my_state, my_dispatch] = useGlobalReducer()

/*
    var connector = new samp.Connector("pinger", {"samp.name": "Pinger"})
    var pingFunc = function(connection) {
        connection.notifyAll([new samp.Message("samp.app.ping", {})])
    }
*/
    return (
        <div className="App">
            <div>
                <h2>SAMP</h2>
            </div>
        </div>
    );
}