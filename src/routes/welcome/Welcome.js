import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";

import { useGlobalReducer } from '../../contexts/GlobalContext';

import LoadingSpinner from '../../components/LoadingSpinner';
import { STATUS, SHOW_SPLASH } from '../../reducers/GlobalStateReducer';

import logo from '../../assets/logo.ico';
import splash1 from '../../assets/splash1.jpg';
import splash2 from '../../assets/splash2.jpg';
import splash3 from '../../assets/splash3.jpg';
import splash4 from '../../assets/splash4.jpg';
import splash5 from '../../assets/splash5.jpg';
import splash6 from '../../assets/splash6.jpg';

export default function Welcome(props) {
    const [ my_state , my_dispatch] = useGlobalReducer()
    const [show, setShow] = useState(true);

    function close(){
        my_dispatch({type: SHOW_SPLASH, show_splash: false})
        setShow(false)
    }

    let renderSpinner
    let renderContinueButton
    if (my_state.status==='fetching') {
        renderSpinner = <LoadingSpinner/>
    } else {
        renderSpinner = <h5>Welcome to my astrophotography collection. All photographs are taken without a telescope and span 20 years from the first feeble single shot attempts to hour long exposures using stacking and tracking</h5>
        renderContinueButton = <Button variant="primary" onClick={close}>Continue</Button>
    }

    let SplashScreen = <div>
        <Modal.Header>
            <Modal.Title>
                <h1><img alt='' src={logo} width="60" height="60" className="d-inline-block align-top"/>&nbsp;AstroView</h1>
                {renderSpinner}
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <img src={splash1} width={250} height={200} />
            <img src={splash3} width={250} height={200} />
            <img src={splash2} width={250} height={200} />
            <img src={splash4} width={250} height={200} />
            <img src={splash5} width={250} height={200} />
            <img src={splash6} width={250} height={200} />
        </Modal.Body>

        <Modal.Footer>
            {renderContinueButton}
        </Modal.Footer>
    </div>

    return (
        <>
        <Modal size="lg" show={show}>
            {SplashScreen}
        </Modal>
        </>
    )

}
