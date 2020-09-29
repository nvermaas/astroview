import React from 'react';
import { Container, Row, Col, Card, Table } from 'react-bootstrap';

import { useGlobalReducer } from '../../contexts/GlobalContext';
import { SET_CURRENT_COLLECTION, SET_COLLECTION_PAGE } from '../../reducers/GlobalStateReducer'
import { filterCollections } from '../../utils/filterObservations'
// this function attempts to load the current collection,
// but it may first need to fetch all the collections first.
// This mechanism is used when a user tries to access a collection directly like
// http://localhost:3000/astroview/collection-details/1

export default function LoadCollection(props) {

    // get the observation info from the global state.
    const [ my_state , my_dispatch] = useGlobalReducer()

    if (my_state.status_collections ==="unfetched") {
        // this dispatch triggers a fetch of all the collections
        my_dispatch({type: SET_COLLECTION_PAGE, collection_page: 1})
    } else {
        // if the collections are fetched, but no 'current_collection' set yet,
        // then isolate that collection and dispatch the SET_CURRENT_COLLECTION

        if ((my_state.fetched_collections) && (!my_state.current_collection)) {
            let id = parseInt(props.id)
            let collections = filterCollections(my_state.fetched_collections, parseInt(props.id), 1)

            let collection = collections[0]
            my_dispatch({type: SET_CURRENT_COLLECTION, current_collection: collection})
        }
    }

    return null
}