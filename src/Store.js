import React, {createContext, useContext, useReducer} from 'react';
// based on https://medium.com/simply/state-management-with-react-hooks-and-context-api-at-10-lines-of-code-baf6be8302c

export const Store = createContext();

export const StoreProvider = ({reducer, initialState, children}) =>(
    <Store.Provider value={useReducer(reducer, initialState)}>
        {children}
    </Store.Provider>
);

export const useGlobalReducer = () => useContext(Store)
