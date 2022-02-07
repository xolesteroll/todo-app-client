import React from 'react';
import AddTodo from "../../components/Todos/AddTodo/AddTodo";
import {useSelector} from "react-redux";
import Spinner from "../../components/UI/Spinner/Spinner";

const NewTodo = () => {
    const isFetching = useSelector(state => state.todos.isFetching)

    return (
        <>
            {isFetching && <Spinner />}
            <AddTodo />
        </>

    );
};

export default NewTodo;
