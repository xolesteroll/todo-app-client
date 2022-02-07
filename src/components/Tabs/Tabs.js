import React from 'react';

import c from './Tabs.module.css'
import TodosList from "../Todos/TodosList";
import TabsNav from "./TabsNav/TabsNav";
import {useSelector} from "react-redux";

const Tabs = () => {
    const user = useSelector(state => state.auth)
    const firstName = user.firstName
    const lastName = user.lastName

    return (
        <div className={c.tabs}>
            <h1 className={c.tabsHeading}>
                Showing <span>{firstName}</span> <span>{`${lastName}'s`}</span> Todos
            </h1>
            <TabsNav />
            <div className={c.tabsContent}>
                <TodosList />
            </div>
        </div>
    );
};

export default Tabs;
