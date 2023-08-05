import React from 'react';

import LoadingSpinner from '../../components/LoadingSpinner';
import ObservationTiles from './ObservationTiles'
import ObservationsGrid from './ObservationsGrid'
import { ButtonBar } from '../../components/ButtonBar';
import { useGlobalReducer } from '../../contexts/GlobalContext';
import Welcome from '../../routes/welcome/Welcome';

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

    let renderSplash
    if (my_state.show_splash) {
        renderSplash = <div>
            <Welcome/>
        </div>
    }

    let renderSpinner
    if (my_state.status === "fetching") {
        renderSpinner = <div>
            <LoadingSpinner/>
        </div>
    }

    return (
        <div className="App">
            <div>
                <ButtonBar/>
                {renderSpinner}
                {renderObservations}
            </div>
        </div>
    );
}