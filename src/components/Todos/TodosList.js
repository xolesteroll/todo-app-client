import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";

import TodoItem from "./TodoItem/TodoItem";
import {Link, useParams} from "react-router-dom";
import {changeTodoStatus, deleteTodo, fetchTodos, restoreTodo} from "../../store/thunks/todoThunks";
import formatDateForDaysCounter from "../../helpers/formatDateForDaysCounter";

import s from './TodosList.module.css'
import Modal from "../UI/Modal/Modal";


const TodosList = () => {
    const dispatch = useDispatch()

    const todosState = useSelector(state => state.todos)
    const userId = useSelector(state => state.auth.id)
    const error = useSelector(state => state.todos.error)
    const [modalVisible, setModalVisible] = useState(!!error)

    const urlParams = useParams()
    const statusFilter = urlParams.statusFilter


    useEffect(() => {
        if (todosState.isInitialFetch) {
            dispatch(fetchTodos(userId))
        }
    }, [dispatch, todosState.isInitialFetch, userId])

    let todos

    if (statusFilter !== 'all' && statusFilter !== 'deleted') {
        todos = todosState.todos.filter(t => t.status === statusFilter)
    }

    if (statusFilter === 'all' || !statusFilter) {
        todos = todosState.todos.filter(t => t.status !== 'deleted')
    }

    if (statusFilter === 'deleted') {
        todos = todosState.todos.filter(t => t.status === 'deleted')
    }

    const statusesList = todosState.statuses

    const onRemoveTodoHandler = (id, status) => {
        dispatch(changeTodoStatus({
            id,
            newStatus: 'deleted',
            oldStatus: status
        }))
    }

    const onRestoreTodoHandler = (id, oldStatus) => {
        dispatch(changeTodoStatus({
            id,
            newStatus: oldStatus,
            oldStatus: 'deleted'
        }))
    }

    const onChangeTodoStatusHandler = ({id, newStatus, oldStatus}) => {
        dispatch(changeTodoStatus({
            id,
            newStatus,
            oldStatus
        }))
    }

    const onModalCloseHandler = () => {
        setModalVisible(false)
    }

    const filteredTodos = todos.filter(t => t.author === userId)

    const todosList = filteredTodos.length > 0 ? filteredTodos.map(t => {
        const remainingTime = formatDateForDaysCounter((+t.finishDate - +t.createdAt))
        console.log(remainingTime)
        return <TodoItem
            key={t.id}
            id={t.id}
            deleted={statusFilter === 'deleted'}
            status={t.status}
            oldStatus={t.oldStatus}
            title={t.title}
            author={t.author}
            remainingTime={remainingTime}
            description={t.description}
            onRemoveTodo={onRemoveTodoHandler}
            onRestoreTodo={onRestoreTodoHandler}
            onChangeTodoStatus={onChangeTodoStatusHandler}
            statusesList={statusesList}
        />
    }) :
        <p>No <span>{statusFilter !== 'all' ? statusFilter : ''}</span> Todos yet, try <Link
            to="/add-new">adding</Link> one</p>


    return (
        <>
            <ul className={s.todoList}>
                {todosList}
            </ul>
            {modalVisible && <Modal message={error} onClose={onModalCloseHandler}/>}
        </>
    );
};

const MemoizedTodosList = React.memo(TodosList)

export default MemoizedTodosList;
