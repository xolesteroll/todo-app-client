import React from 'react';

import {Link} from "react-router-dom";

import logo from "../../../assets/images/logo-10eeb40b2eee870f7950a668ee7ccd19.png"

import c from './Header.module.css'
import HeaderNav from "./HeaderNav/HeaderNav";

const Header = () => {

    return (
        <div className={c.header}>
            <div className={c.headerInner}>
                <div className={c.headerLogo}>
                    <Link to="/">
                        <img src={logo} alt="main logo"/>
                    </Link>
                </div>
                <HeaderNav />
            </div>
        </div>
    );
};

export default Header;
