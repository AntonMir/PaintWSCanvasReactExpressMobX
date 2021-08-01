import React, {useRef, useEffect, useState} from 'react';
// router
import {useParams} from "react-router-dom"
// styled
import '@styles/canvas.scss'
// state
import {observer} from 'mobx-react-lite';
import canvasstate from '@store/canvasstate';
// tools
import toolstate from '../store/toolstate';
import Brash from '../tools/brash';
// bootstrap
import {Modal, Button} from "react-bootstrap";

const Canvas = observer(() => {

    const canvasRef = useRef()
    const usernameRef = useRef()
    const [modal, setModal] = useState(true)
    const params = useParams()

    useEffect(() => {
        canvasstate.setCanvas(canvasRef.current)
        toolstate.setTool( new Brash(canvasRef.current) )
    }, [])

    useEffect(() => {
        if(canvasstate.username) {
            const socket = new WebSocket(`ws://localhost:5000/`);
            socket.onopen = () => {
                socket.send(JSON.stringify({
                    id: params.id,
                    username: canvasstate.username,
                    method: "connection"
                }))
            }
            socket.onmessage = (event) => {
                console.log('---', event.data);
            }
        }
    }, [])

    const mouseDownHandler = () => {
        canvasstate.pushToUndo(canvasRef.current.toDataURL())
    }

    const connectHandler = () => {
        canvasstate.setUsername(usernameRef.current.value)
        setModal(false);
    }


    return (
        <div className="canvas">
            <Modal show={modal} onHide={() => {}}>
                <Modal.Header >
                    <Modal.Title>Введите ваше имя</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input type="text" ref={usernameRef}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => connectHandler()}>
                        Войти
                    </Button>
                </Modal.Footer>
            </Modal>
            <canvas onMouseDown={() => mouseDownHandler()} ref={canvasRef} width={600} height={400}/>
        </div>
    );
});

export default Canvas;
