import React, { useContext, useState, useEffect } from "react";
import { Button, Modal, Form, Table, Card } from "react-bootstrap";

import { ASTROBASE_URL } from '../../utils/skyserver'
import { useGlobalReducer } from '../../contexts/GlobalContext';
import { AuthContext } from '../../contexts/AuthContext'
import {
    SET_CUTOUT_PAGE,
    RELOAD
} from '../../reducers/GlobalStateReducer';
import { getCutoutIcon } from '../../utils/styling'

export default function NewCutoutModalForm(props) {
    const [ my_state , my_dispatch] = useGlobalReducer()
    const { isAuthenticated } = useContext(AuthContext);
    const [ra, setRa] = useState();
    const [dec, setDec] = useState();
    const [fov, setFov] = useState();
    const [name, setName] = useState();
    const [size, setSize] = useState();

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function executeCutoutCommand(e) {
        let params = ra + ',' + dec + ',' + fov + ',' + name + ',' + size
        let url_command = ASTROBASE_URL + "run-command?command=image_cutout&params=" + params

        fetch(url_command)
            .then(() => {
                my_dispatch({type: RELOAD, reload: !my_state.reload})
            })

        setShow(false)
    };

    function close(){
        setShow(false)
    }

    if (isAuthenticated)  {

        let newCutoutForm = <div>
            <Modal.Header closeButton>
                <Modal.Title>{getCutoutIcon('black')}{' '}New Cutout</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Label>Name</Form.Label>
                <Form.Control as="textarea" rows={1} value={name}
                              onChange={e => setName(e.target.value)}>
                </Form.Control>
                <Table>
                    <tr>
                        <td>
                            <Form.Label>RA</Form.Label>
                            <Form.Control as="textarea" rows={1} value={ra}
                                          onChange={e => setRa(e.target.value)}>
                            </Form.Control>
                            <Form.Text className="text-muted">
                                Central RA,dec of the cutout in decimal degrees
                            </Form.Text>
                        </td>
                        <td>
                            <Form.Label>dec</Form.Label>
                            <Form.Control as="textarea" rows={1} value={dec}
                                          onChange={e => setDec(e.target.value)}>
                            </Form.Control>
                        </td>
                        <td>
                            <Form.Label>field of view (degrees)</Form.Label>
                            <Form.Control as="textarea" rows={1} value={fov}
                                          onChange={e => setFov(e.target.value)}>
                            </Form.Control>
                        </td>
                    </tr>
                </Table>
                <Form.Label>Size</Form.Label>
                <Form.Control as="textarea" rows={1} value={size}
                              onChange={e => setSize(e.target.value)}>
                </Form.Control>
                <Form.Text className="text-muted">
                    The size in pixels of the generated cutout images
                </Form.Text>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="succes_xxx" onClick={executeCutoutCommand}>
                {getCutoutIcon(true)}{' '}Create
            </Button>
                <Button variant="warning_xxx" onClick={close}>Cancel
                </Button>
            </Modal.Footer>
        </div>

        return (
            <>
            <Button
                type="button"
                variant="warning"
                onClick={handleShow}
                {...props}>
                {getCutoutIcon('white')}&nbsp;New Cutout
            </Button>

            <Modal size="lg" show={show} onHide={handleClose}>
                {newCutoutForm}
            </Modal>
            </>
        )

    }
    else{
        return null
    }
}
