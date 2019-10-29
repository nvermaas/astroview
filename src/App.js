import React from 'react';
import './App.css';
import { StoreProvider } from './Store';
import { reducer, initialState } from './reducers/GlobalStateReducer';
import Main from './components/Main';

// This is the App, only application global stuff goes here, like the global state provider.


export default function App () {
    return (
        <StoreProvider initialState={initialState} reducer={reducer}>
            <Main />
        </StoreProvider>
    );
}
