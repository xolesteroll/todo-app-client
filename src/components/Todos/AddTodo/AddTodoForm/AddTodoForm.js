import React, {useState} from 'react';
import formatDate from "../../../../helpers/formatDateForInputValueHelper";
import {todosActions} from "../../../../store/slices/todosSlice";

import c from './AddTodoForm.module.css'
import MyButton from "../../../UI/MyButton/MyButton";
import {useDispatch} from "react-redux";

const AddTodoForm = ({onAddTodoHandler}) => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [finishDate, setFinishDate] = useState(formatDate(new Date().toLocaleDateString()))

    const dispatch = useDispatch()

    const onTitleChangeHandler = (e) => {
        const text = e.target.value
        setTitle(text)
    }

    const onDescriptionChangeHandler = (e) => {
        const descr = e.target.value
        setDescription(descr)
    }
    const onFinishDateChangeHandler = (e) => {
        const date = e.target.value

        setFinishDate(date)
    }

    const onSubmitHandler = (e) => {
        e.preventDefault()
        const formattedFinishDate = new Date(finishDate).getTime()
        console.log(formattedFinishDate, new Date().getTime())
        console.log(formattedFinishDate <= new Date().getTime())
        if (formattedFinishDate <= new Date().getTime()) {
            dispatch(todosActions.setTodosError("You can only pick future dates, right?=)"))
        } else {
            onAddTodoHandler({
                title,
                description,
                finishDate: formattedFinishDate.toString()
            })
        }
        setTitle('')
        setDescription('')
        setFinishDate(formatDate(new Date().toLocaleDateString()))
    }


    return (
        <form className={c.addTodoForm} onSubmit={onSubmitHandler}>
            <div className={c.formFields}>
                <label htmlFor="title">Enter the title</label>
                <input name="title" value={title} onChange={onTitleChangeHandler} type="text"/>
                <label htmlFor="description">Describe the Todo</label>
                <textarea name="description" value={description} onChange={onDescriptionChangeHandler} type="text"/>
                <label htmlFor="finish-date">Pick finish date</label>
                <input name="finish-date" value={finishDate} onChange={onFinishDateChangeHandler} type="date"/>
            </div>
            <div className={c.formControls}>
                <MyButton type="submit" text="Add Todo" color="#ffffff" hoverColor="#000000" bgColor="#6fdd8f" paddingOnHover/>
            </div>
        </form>
    );
};

export default AddTodoForm;
