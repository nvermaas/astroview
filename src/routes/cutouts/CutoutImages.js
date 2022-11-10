import React, {useState, useEffect }  from 'react';

import { useGlobalReducer } from '../../contexts/GlobalContext';
import { ASTROBASE_URL } from '../../utils/skyserver'

import {
    SET_STATUS_CUTOUT_IMAGES,
    SET_FETCHED_CUTOUT_IMAGES,
} from '../../reducers/GlobalStateReducer';

import LoadingSpinner from '../../components/LoadingSpinner';
import ImageTiles from './ImageTiles'

export default function CutoutImages(props) {

    const [ my_state , my_dispatch] = useGlobalReducer()

    useEffect(() => {
            fetchImages(my_state.current_cutout)
        }, [my_state.reload, my_state.current_cutout]
    );


    const fetchImages = (current_cutout) => {

        // only try to fetch images if a cutout is selected
        if (!current_cutout) return null

        let url = ASTROBASE_URL + "cutouts/?visible=true&directory=" + current_cutout.directory

        if (my_state.status_cutout_images !== 'fetching')  {

            my_dispatch({type: SET_STATUS_CUTOUT_IMAGES, status_cutout_images: 'fetching'})

            fetch(url)
                .then(results => {
                    return results.json();
                })
                .then(data => {
                    my_dispatch({type: SET_FETCHED_CUTOUT_IMAGES, fetched_cutout_images: data.results})
                    my_dispatch({type: SET_STATUS_CUTOUT_IMAGES, status_cutout_images: 'fetched'})
                })
                .catch(function () {
                    my_dispatch({type: SET_STATUS_CUTOUT_IMAGES, status_cutout_images: 'failed'})
                    alert("fetching cutout_images from " + url + " failed.");
                })
        }
    }


    if (my_state.status_cutout_images !== "fetched") {
        return <div>No cutout selected</div>
    }

    return (
        <div className="App">
            <div>
                <ImageTiles data={my_state.fetched_cutout_images}/>
            </div>
        </div>
    );
}