import React from 'react';
import './App.css';
import { GlobalContextProvider } from './contexts/GlobalContext';
import { AuthContextProvider } from './contexts/AuthContext';

import { reducer, initialState } from './reducers/GlobalStateReducer';
import Main from './components/Main';

// This is the App, only application global stuff goes here, like the global state provider.

export default function App () {
    return (

        <GlobalContextProvider initialState={initialState} reducer={reducer}>
            <AuthContextProvider>
                <Main />
            </AuthContextProvider>
        </GlobalContextProvider>

    );
}
