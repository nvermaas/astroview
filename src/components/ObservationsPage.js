
import React, {useState, useEffect, useReducer }  from 'react';
import { Container, Jumbotron, Row, Col } from 'react-bootstrap';
import LoadingSpinner from './LoadingSpinner';
import ObservationTiles from './ObservationTiles'

import { SET_FETCHED_OBSERVATIONS, SET_ACTIVE_TASKID} from '../reducers/GlobalStateReducer';
import { useGlobalReducer } from '../Store';
//import { reducer, initialState } from '../reducers/GlobalStateReducer';

//const url = "http://uilennest.net:81/astrobase/observations"
const url = "http://localhost:8000/astrobase/observations"

export default function Observations(props) {

    const [ my_state , my_dispatch] = useGlobalReducer()
    // const [ my_state, my_dispatch] = useReducer(reducer, initialState)

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
                    my_dispatch({type: SET_FETCHED_OBSERVATIONS, fetched_observations: data.results})
                    //my_dispatch({type: SET_ACTIVE_TASKID, taskid: "321"})
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
                        {my_state.taskid}
                        {renderObservations}
                    </div>
                }

            </header>

        </div>
    );
}