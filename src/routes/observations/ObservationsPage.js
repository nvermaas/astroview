import React from 'react';

import LoadingSpinner from '../../components/LoadingSpinner';
import ObservationTiles from './ObservationTiles'
import ObservationsGrid from './ObservationsGrid'
import { useGlobalReducer } from '../../Store';

export default function Observations(props) {

    const [ my_state , my_dispatch] = useGlobalReducer()

    // conditional render. Only render the observations when the status is 'fetched'
    let renderObservations

    if (my_state.status!=='unfetched') {

        if (my_state.view === 'tiles') {
            renderObservations =
                <header className="Observations-header">
                    <ObservationTiles data={my_state.fetched_observations}/>
                </header>
        } else {
            renderObservations = <ObservationsGrid data={my_state.fetched_observations}/>
        }
    }

    let renderSpinner
    if (my_state.status === "fetching") {
        renderSpinner = <LoadingSpinner/>
    }

    return (
        <div className="App">
            <div>
                {renderSpinner}
                {renderObservations}
            </div>
        </div>
    );
}