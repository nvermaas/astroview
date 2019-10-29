
import React, {useState, useEffect, useReducer }  from 'react';
import { Container, Jumbotron, Row, Col } from 'react-bootstrap';
import LoadingSpinner from './LoadingSpinner';
import ObservationTiles from './ObservationTiles'

import { SET_FETCHED_OBSERVATIONS, SET_ACTIVE_TASKID, SET_STATUS} from '../reducers/GlobalStateReducer';
import { useGlobalReducer } from '../Store';

//const url = "http://uilennest.net:81/astrobase/observations"
const url = "http://localhost:8000/astrobase/observations"

export default function Observations(props) {

    const [ my_state , my_dispatch] = useGlobalReducer()

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
        if (my_state.status !== 'fetching')  {
            console.log('fetchObservations: ' + (url))

            fetch(url)
                .then(results => {
                    return results.json();
                })
                .then(data => {
                    my_dispatch({type: SET_FETCHED_OBSERVATIONS, fetched_observations: data.results})
                    my_dispatch({type: SET_STATUS, status: 'fetched'})
                })
                .catch(function () {
                    my_dispatch({type: SET_STATUS, status: 'failed'})
                    alert("fetch to " + url + " failed.");
                })
        }
    }

    const loading = my_state.status === 'fetching'

    // conditional render. Only render the observations when the status is 'fetched'
    let renderObservations

    if (my_state.status==='fetched') {
        renderObservations = <ObservationTiles data = {my_state.fetched_observations} />
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