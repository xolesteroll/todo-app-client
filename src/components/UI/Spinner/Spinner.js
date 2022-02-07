import React from 'react';
import spinnerImg from '../../../assets/images/loader.svg'

import c from './Spinner.module.css'
import {createPortal} from "react-dom";

const Spinner = () => {
    const portalDestination = document.getElementById('spinner-root')

    return (
        createPortal(<div className={c.spinnerWrapper}>
            <img src={spinnerImg} alt=""/>
        </div>, portalDestination)

    );
};

export default Spinner;
