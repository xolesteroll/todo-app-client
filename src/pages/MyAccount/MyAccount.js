import React from 'react';

import c from './MyAccount.module.css'
import SetAvatar from "../../components/SetAvatar/SetAvatar";

const MyAccount = () => {
    return (
        <div className={c.myAccountPageWrapper}>
            <SetAvatar />
        </div>
    );
};

export default MyAccount;
