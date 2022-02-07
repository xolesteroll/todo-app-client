import React from 'react';
import {NavLink} from "react-router-dom";

import c from './TabsNavItem.module.css'

const TabsNavItem = ({url, text, counter, activeBgColor, isItemActive, onChangeIsActive}) => {

    const activeClassFunc = (isActive) => {
        if (isActive) {
            return `${c.tabsNavItem} ${c.active}`
        } else {
            return c.tabsNavItem
        }
    }

    const styles = {
        backgroundColor: isItemActive ? activeBgColor : 'transparent'
    }

    return (
        <NavLink className={() => activeClassFunc(isItemActive)} onClick={onChangeIsActive} to={url} style={styles}>
            {text}<span>({counter ? counter : 0})</span>
        </NavLink>
    );
};

export default TabsNavItem;
