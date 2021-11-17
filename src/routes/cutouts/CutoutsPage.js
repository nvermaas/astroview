import React, {useState, useEffect }  from 'react';

import LoadingSpinner from '../../components/LoadingSpinner';
import CutoutTiles from './CutoutTiles'
import { ButtonBar } from '../../components/ButtonBar';
import { useGlobalReducer } from '../../contexts/GlobalContext';
import { ASTROBASE_URL } from '../../utils/skyserver'

import {
    SET_STATUS_CUTOUTS,
    SET_TOTAL_CUTOUTS,
    SET_FETCHED_CUTOUTS,
    SET_CURRENT_CUTOUT,
    RELOAD
} from '../../reducers/GlobalStateReducer';

export const url_cutout_directories = ASTROBASE_URL + "cutout_directories"

export default function CutoutsPage(props) {

    const [ my_state , my_dispatch] = useGlobalReducer()

    useEffect(() => {
            fetchData(url_cutout_directories)
        }, [my_state.reload]
    );

    const fetchData = (url) => {

        if (my_state.status_cutouts !== 'fetching')  {

            my_dispatch({type: SET_STATUS_CUTOUTS, status_cutouts: 'fetching'})

            fetch(url)
                .then(results => {
                    return results.json();
                })
                .then(data => {
                    my_dispatch({type: SET_FETCHED_CUTOUTS, fetched_cutouts: data.results})
                    my_dispatch({type: SET_STATUS_CUTOUTS, status_cutouts: 'fetched'})
                })
                .catch(function () {
                    my_dispatch({type: SET_STATUS_CUTOUTS, status_cutouts: 'failed'})
                    alert("fetching cutouts from " + url + " failed.");
                })
        }
    }

    // conditional render. Only render the observations when the status is 'fetched'
    let renderCutouts

    if (my_state.status_cutouts === 'fetched') {

        renderCutouts = <header className="Observations-header">
                            <CutoutTiles data={my_state.fetched_cutouts}/>
                        </header>
    }

    let renderSpinner
    if (my_state.status_cutouts === "fetching") {
        renderSpinner = <LoadingSpinner/>
    }

    return (
        <div className="App">
            <div>
                {renderSpinner}
                {renderCutouts}
            </div>
        </div>
    );
}