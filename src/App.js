import React, {useEffect} from "react";

import Layout from "./components/UI/Layout/Layout";
import {Route, Routes} from "react-router-dom";
import NewTodo from "./pages/NewTodo/NewTodo";
import Homepage from "./pages/Homepage/Homepage";
import NotFound from "./pages/NotFound/NotFound";
import {useDispatch, useSelector} from "react-redux";
import Login from "./components/Login/Login";
import MyTodos from "./pages/MyTodos/MyTodos";
import {authThunk} from "./store/thunks/authThunks";
import Spinner from "./components/UI/Spinner/Spinner";
import MyAccount from "./pages/MyAccount/MyAccount";

function App() {
    const isAuth = useSelector(state => state.auth.isAuth)
    const isFetching = useSelector(state => state.auth.isFetching)
    const dispatch = useDispatch()

    useEffect(() => {
        if (localStorage.getItem('token') && !isAuth) {
            dispatch(authThunk())
        }
    }, [dispatch, isAuth])

    return (
        <Layout>
            {isFetching ? <Spinner/> : <Routes>
                {isAuth &&
                <>
                    <Route path="/" element={<Homepage/>}/>
                    <Route path="/add-new" element={<NewTodo/>}/>
                    <Route path="/my-todos" element={<MyTodos/>}>
                        <Route path=":statusFilter" element={<MyTodos/>}/>
                    </Route>
                    <Route path="/my-account" element={<MyAccount/>}/>
                </>}
                {!isAuth &&
                <>
                    <Route path="/login" element={<Login/>}/>}
                </>}
                <Route path="*" element={isAuth ? <NotFound/> : <Login/>}/>
            </Routes>}

        </Layout>
    );
}

export default App;
