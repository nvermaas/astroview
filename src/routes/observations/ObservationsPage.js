import React from 'react';

import LoadingSpinner from '../../components/LoadingSpinner';
import ObservationTiles from './ObservationTiles'
import ObservationsGrid from './ObservationsGrid'
import { ButtonBar } from '../../components/ButtonBar';
import { useGlobalReducer } from '../../contexts/GlobalContext';
import SplashModal from '../../components/SplashModal'

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
    if (my_state.status === "fetching" && my_state.show_splash) {
        renderSplash = <div>
            <SplashModal/>
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
                {renderSplash}
                {renderObservations}
            </div>
        </div>
    );
}