import React from "react";
import { Modal } from "react-bootstrap";

import { useGlobalReducer } from '../contexts/GlobalContext';
import { SHOW_SPLASH } from '../reducers/GlobalStateReducer'

import LoadingSpinner from '../components/LoadingSpinner';
import { STATUS } from '../reducers/GlobalStateReducer';

import logo from '../assets/logo.ico';
import splash1 from '../assets/splash1.jpg';
import splash2 from '../assets/splash2.jpg';
import splash3 from '../assets/splash3.jpg';
import splash4 from '../assets/splash4.jpg';
import splash5 from '../assets/splash5.jpg';
import splash6 from '../assets/splash6.jpg';

export default function SplashModal(props) {
    const [ my_state , my_dispatch] = useGlobalReducer()

    let SplashScreen = <div>
        <Modal.Header>
            <Modal.Title>
                <h1><img alt='' src={logo} width="60" height="60" className="d-inline-block align-top"/>&nbsp;
                AstroView</h1>
                <LoadingSpinner/></Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <img src={splash1} width={250} height={200} />
            <img src={splash3} width={250} height={200} />
            <img src={splash2} width={250} height={200} />
            <img src={splash4} width={250} height={200} />
            <img src={splash5} width={250} height={200} />
            <img src={splash6} width={250} height={200} />
        </Modal.Body>

    </div>

    return (
        <>
        <Modal size="lg" show="true">
            {SplashScreen}
        </Modal>
        </>
    )

}
