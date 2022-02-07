import React from 'react';

import c from './ModalOverlay.module.css'

const ModalOverlay = ({children, onModalClose}) => {
    const closeModalHandler = (e) => {
        if (e.target === e.currentTarget) {
            onModalClose()
        }
    }

    return (
        <div onClick={closeModalHandler} className={c.overlay}>
            {children}
        </div>
    );
};

export default ModalOverlay;
