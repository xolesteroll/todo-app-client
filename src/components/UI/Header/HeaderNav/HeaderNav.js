import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {authActions} from "../../../../store/slices/authSlice";
import {todosActions} from "../../../../store/slices/todosSlice";
import c from "../Header.module.css";
import {NavLink, useNavigate} from "react-router-dom";
import MyButton from "../../MyButton/MyButton";

const HeaderNav = () => {
    const isAuth = useSelector(state => state.auth.isAuth)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const onLogoutHandler = () => {
        dispatch(authActions.logout())
        dispatch(todosActions.setIsInitialFetch(true))
        dispatch(todosActions.resetQty())
        navigate("/login")
    }

    const activeClassFunc = ({isActive}) => `${c.headerNavLink} ${isActive ? c.active : ""}`

    const authNav = isAuth ?
        <>
            <NavLink className={activeClassFunc} to="/my-account">My Account</NavLink>
            <MyButton
                onClickHandler={onLogoutHandler}
                color="#ffffff"
                bgColor="red"
                hoverColor="#000000"
                text="Logout"
            >
                Logout
            </MyButton>
        </> :
        <NavLink className={activeClassFunc} to="/login">Login</NavLink>

    return (
        <nav className={c.headerNav}>
            {
                isAuth && <>
                    <NavLink className={activeClassFunc} to="/">Home</NavLink>
                    <NavLink className={activeClassFunc} to="/my-todos">View my todos</NavLink>
                    <NavLink className={activeClassFunc} to="/add-new">Add new todo</NavLink></>
            }
            {authNav}
        </nav>
    );
};

export default HeaderNav;
