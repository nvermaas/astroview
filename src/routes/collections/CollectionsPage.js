import React from 'react';

import LoadingSpinner from '../../components/LoadingSpinner';
import CollectionsGrid from './CollectionsGrid'
import { ButtonBarCollections } from '../../components/ButtonBarCollections';
import { useGlobalReducer } from '../../contexts/GlobalContext';

import { SET_CURRENT_COLLECTION, SET_COLLECTION_PAGE } from '../../reducers/GlobalStateReducer'
import { filterCollections } from '../../utils/filterObservations'

export default function Collections(props) {

    const [ my_state, my_dispatch] = useGlobalReducer()
    const loading = my_state.status_collections === 'fetching'

    // conditional render. Only render the collections when the status is 'fetched'
    let renderCollections

    if (my_state.status_collections!=='unfetched') {
        let collections = my_state.fetched_collections

        if (props.id) {
            collections = filterCollections(my_state.fetched_collections, props.id, 1)
            if (collections.length===0) {
                collections = filterCollections(my_state.current_observations, props.id, 1)
            }
        }
        renderCollections = <CollectionsGrid data={collections}/>
    }

    let renderSpinner
    if (my_state.collection_status === "fetching") {
        renderSpinner = <LoadingSpinner/>
    }

    return (
        <div className="App">
            <div>
                <ButtonBarCollections/>
                {renderSpinner}
                {renderCollections}
            </div>
        </div>
    );
}