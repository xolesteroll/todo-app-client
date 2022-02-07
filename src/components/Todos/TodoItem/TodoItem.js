import React, {useState} from 'react';
import Modal from "../../UI/Modal/Modal";

import c from './TodoItem.module.css'
import MyButton from "../../UI/MyButton/MyButton";

const TodoItem = React.memo(({
                                 id,
                                 title,
                                 description,
                                 deleted,
                                 status,
                                 oldStatus,
                                 remainingTime,
                                 onRemoveTodo,
                                 onRestoreTodo,
                                 onChangeTodoStatus,
                                 statusesList
                             }) => {

    const [showModal, setShowModal] = useState(false)
    const [editStatusMode, setEditStatusMode] = useState(false)

    const onDoubleClickHandler = () => {
        setEditStatusMode(true)
    }

    const changeTodoStatus = (changedStatus) => {
        if (changedStatus !== status) {
            onChangeTodoStatus({
                id,
                newStatus: changedStatus,
                oldStatus
            })
        }
        setEditStatusMode(false)
    }

    const modalOpenHandler = () => {
        setShowModal(true)
    }

    const modalCloseHandler = () => {
        setShowModal(false)
    }

    const currentStatusColor = statusesList.find(s => s.id === status).color
    const oldStatusColor = statusesList.find(s => s.id === oldStatus).color

    const actionBtns = !deleted ?
        <>
            <MyButton
                className={`${c.actionBtn}`}
                onClickHandler={() => {}}
                text="edit"
                bgColor="blue"
                hoverColor="#000000"
            />
            <MyButton
                className={`${c.actionBtn}`}
                onClickHandler={modalOpenHandler}
                text="delete"
                bgColor="red"
                hoverColor="#000000"
            />
        </>
         :
        <MyButton
            className={`${c.actionBtn} ${c.restoreBtn}`}
            onClickHandler={modalOpenHandler}
            text="restore"
            bgColor="green"
            hoverColor="#000000"
        />

    return (
        <>
            {showModal && <Modal
                message={`Are you sure you want to ${!deleted ? 'delete' : 'restore'} this todo???`}
                submittable
                onSubmit={!deleted ? () => onRemoveTodo(id, status) : () => onRestoreTodo(id, oldStatus)}
                onClose={modalCloseHandler}
            />}
            <li className={c.listItem}>
                <h3 className={c.listItemTitle}>{title}</h3>
                <p className={c.listItemDescription}>{description}</p>
                {
                    !deleted && <span className={c.timeCounter}>
                    {`Time left: ${remainingTime.days} days and ${remainingTime.hours} hours`}
                </span>
                }
                <div onDoubleClick={!deleted ? onDoubleClickHandler : null}>
                    {
                        (!editStatusMode && !deleted) &&
                            <>
                                <span className={c.statusBar} style={{backgroundColor: currentStatusColor}}>
                    {status}
                </span>
                                <span className={c.listItemPrompt}>{" -Double click to change status"}</span>
                            </>

                    }
                    {/*//Status section on deleted items*/}
                    {!editStatusMode && deleted &&
                    <>
                        <span>was on </span>
                        <span className={c.statusBar} style={{backgroundColor: oldStatusColor}}>
                {oldStatus}
                    </span>
                        <span> status before removal</span>
                        <span className={c.timeCounter}>
                            {`Had ${remainingTime.days} days left until finish`}
                        </span>
                    </>}
                    {editStatusMode &&
                    <div className={c.statusControls}>
                        {statusesList.map(s => {
                            if (s.id === 'deleted') {
                                return null
                            }
                            return <button
                                className={c.statusBtn}
                                style={{backgroundColor: s.color}}
                                onClick={() => changeTodoStatus(s.id)}
                                key={s.id}
                            >
                                {s.id}
                            </button>
                        })}
                    </div>
                    }
                </div>
                <div className={c.listItemControls}>
                    {actionBtns}
                </div>
            </li>
        </>
    )
        ;
});

export default TodoItem;
