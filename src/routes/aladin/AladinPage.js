import React from 'react';

import LoadingSpinner from '../../components/LoadingSpinner';
import { useGlobalReducer } from '../../contexts/GlobalContext';
import Aladin from './Aladin'

export default function AladinPage(props) {

    const [ my_state, my_dispatch] = useGlobalReducer()

    // https://stackoverflow.com/questions/61347860/using-aladin-lite-app-not-built-for-react-in-react-app
    let defaultSurvey = {survey: "P/DSS2/color"}
    let fov = my_state.aladin_fov
    if (fov==='0') {
        fov = '10'
    }
    return (
        <div className="aladin">
            <Aladin ra={my_state.aladin_ra} dec={my_state.aladin_dec} fov={fov}/>
        </div>
    );
}