import React from 'react';
import ModalOverlay from "./ModalOverlay/ModalOverlay";

import c from './Modal.module.css'
import {createPortal} from "react-dom";
import MyButton from "../MyButton/MyButton";

const Modal = ({message, onClose, onSubmit, submittable, submitBtnText, cancelBtnText}) => {
    const portalDestination = document.getElementById('modal-root')


    return (
        createPortal(<ModalOverlay onModalClose={onClose}>
            <div className={c.modal}>
                <p>{message}</p>
                <div className={c.modalControls}>
                    {!submittable && <MyButton
                        onClickHandler={onClose}
                        text="OK"
                        color="#ffffff"
                        hoverColor="#000000"
                        bgColor="#6fdd8f"
                        paddingOnHover/>}
                    {submittable && <>
                        <MyButton
                            styles={{
                                position: 'absolute',
                                left: '50px'
                            }}
                            onClickHandler={onSubmit}
                            text={submitBtnText || "Confirm"}
                            color="#ffffff"
                            hoverColor="#000000"
                            bgColor="#6fdd8f"
                            paddingOnHover/>
                        <MyButton
                            styles={{
                                position: 'absolute',
                                right: '50px'
                            }}
                            onClickHandler={onClose}
                            text={cancelBtnText || "Cancel"}
                            color="#ffffff"
                            hoverColor="#000000"
                            bgColor="red"
                            paddingOnHover/>
                    </>}
                </div>
            </div>
        </ModalOverlay>, portalDestination)
    );
};

export default Modal;
