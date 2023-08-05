import React from 'react';
import './App.css';
import { GlobalContextProvider } from './contexts/GlobalContext';
import { AuthContextProvider } from './contexts/AuthContext';

import { reducer, initialState } from './reducers/GlobalStateReducer';
import Main from './components/Main';

// This is the App, only application global stuff goes here, like the global state provider.
// Create the function
export function AddLibrary(urlOfTheLibrary) {
    const script = document.createElement('script');
    script.src = urlOfTheLibrary;
    script.async = true;
    document.body.appendChild(script);
}

export default function App () {
    return (

        <GlobalContextProvider initialState={initialState} reducer={reducer}>
            <AuthContextProvider>
                <div>
                    {/* Call the function to add a library */}
                    {AddLibrary(
                        'https://uilennest.net/repository/libraries/wcs.js')}
                </div>
                <Main />
            </AuthContextProvider>
        </GlobalContextProvider>

    );
}
