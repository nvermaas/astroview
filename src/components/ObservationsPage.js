
import React, {useState, useEffect, useReducer }  from 'react';
import { Container, Jumbotron, Row, Col } from 'react-bootstrap';
import LoadingSpinner from './LoadingSpinner';
import ObservationTiles from './ObservationTiles'

//const url = "http://uilennest.net:81/astrobase/observations"
const url = "http://localhost:8000/astrobase/observations"

export default function Observations(props) {

    const [status, setStatus] = useState("unfetched")
    const [fetchedObservations, setFetchedObservations] = useState("ready")
    const [timer, setTimer] = useState(undefined)

    // this executes fetchObservations only once (because the 'dependencies array' is empty: [])
    useEffect(() => {
            fetchObservations(url)
        },[]
    );

    // this executes 'setTimer' once, which refreshes the observationlist every minute.
    useEffect(() => {
            setTimer(setInterval(() => fetchObservations(url), 60000))

            // this function is automatically called when the component unmounts
            return function cleanup() {
                clearInterval(timer);
            }
        },[]
    );


    // get the data from the api
    const fetchObservations = (url) => {
        if ((status !== 'fetching') && (status !== 'do_config')) {
            console.log('fetchObservations: ' + (url))
            setStatus('fetching')

            fetch(url)
                .then(results => {
                    return results.json();
                })
                .then(data => {
                    setFetchedObservations(data.results)
                    setStatus('fetched')
                })
                .catch(function () {
                    setStatus('failed')
                    alert("fetch to " + url + " failed.");
                })
        }
    }

    const loading = status === 'fetching'

    // conditional render. Only render the observations when the status is 'fetched'
    let renderObservations
    if (status==='fetched') {
        renderObservations = <ObservationTiles data = {fetchedObservations} />
    }

    return (
        <div className="App">
            <header className="Observations-header">

                {loading ? <LoadingSpinner /> :
                    <div>
                        {renderObservations}
                    </div>
                }

            </header>

        </div>
    );
}