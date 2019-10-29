import React from 'react';

import { useGlobalReducer } from '../Store';
import { Store } from '../Store'

export function About() {
    const [ my_state , my_dispatch] = useGlobalReducer()

    // my_dispatch({type: "SET_ACTIVE_TASKID", taskid: "777"})
    return (
        <div>
            <h2>About AstroView {my_state.taskid}</h2>
            <p>
                This is a 'technology demonstration' of using a ReactJS frontend on top of the AstroBase Django backend.
            </p>
            <button onClick={() => my_dispatch({type: "SET_ACTIVE_TASKID", taskid: "777"})}>
                777
            </button>
        </div>
    );
}