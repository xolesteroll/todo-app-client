import React from 'react';

import c from './Layout.module.css'
import Header from "../Header/Header";

const Layout = (props) => {
    return (
        <>
            <Header />
            <div className={c.container}>
                {props.children}
            </div>
        </>

    );
};

export default Layout;
