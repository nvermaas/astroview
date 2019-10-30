
import React from 'react';

import LoadingSpinner from './LoadingSpinner';
import ObservationTiles from './ObservationTiles'

import { useGlobalReducer } from '../Store';



export default function Observations(props) {

    const [ my_state , my_dispatch] = useGlobalReducer()

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