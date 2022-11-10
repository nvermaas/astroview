import React, {useState, useEffect }  from 'react';

import { useGlobalReducer } from '../../contexts/GlobalContext';
import { ASTROBASE_URL } from '../../utils/skyserver'

import {
    SET_STATUS_CUTOUTS,
    SET_FETCHED_CUTOUTS,
} from '../../reducers/GlobalStateReducer';

import LoadingSpinner from '../../components/LoadingSpinner';
import DirectoryTiles from './DirectoryTiles'

export const url_cutout_directories = ASTROBASE_URL + "cutout_directories/"

export default function CutoutDirectories(props) {

    const [ my_state , my_dispatch] = useGlobalReducer()

    useEffect(() => {
            fetchDirectories(url_cutout_directories)
        }, [my_state.reload]
    );


    const fetchDirectories = (url) => {

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

    if (my_state.status_cutouts !== "fetched") {
        return <LoadingSpinner/>
    }

    return (
        <div className="App">
            <div>
                <DirectoryTiles data={my_state.fetched_cutouts}/>

            </div>
        </div>
    );
}