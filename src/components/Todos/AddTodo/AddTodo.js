import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";

import {addTodo} from "../../../store/thunks/todoThunks";
import {useNavigate} from "react-router-dom";
import AddTodoForm from "./AddTodoForm/AddTodoForm";
import {todosActions} from "../../../store/slices/todosSlice";

import c from "./AddTodo.module.css"
import Modal from "../../UI/Modal/Modal";

const AddTodo = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const error = useSelector(state => state.todos.error)
    const isFetching = useSelector(state => state.todos.isFetching)
    const [modalVisible, setModalVisible] = useState(false)

    let modalText = "Your new todo was successfully added to the list, would you like to add one more?"

    const onModalSubmitHAndler = () => {
        setModalVisible(false)
    }

    const onModalCancelHandler = () => {
        navigate('/my-todos')
    }

    const onErrorModalClose = () => {
        dispatch(todosActions.resetTodosError())
        setModalVisible(false)
    }

    const onAddTodoHandler = (todo) => {
        dispatch(addTodo(
            {
                todo
            }))
        setModalVisible(true)
    }

    return (
        <div className={c.addTodoFormWrapper}>
            <AddTodoForm onAddTodoHandler={onAddTodoHandler}/>
            {(modalVisible && !isFetching && !error) && <Modal
                message={modalText}
                onClose={onModalCancelHandler}
                onSubmit={onModalSubmitHAndler}
                submitBtnText="Yeap"
                cancelBtnText="Nope"
                submittable
            />}
            {(!!error && !isFetching) && <Modal
                message={error}
                onClose={onErrorModalClose}
            />}

        </div>
    );
};

export default AddTodo;
