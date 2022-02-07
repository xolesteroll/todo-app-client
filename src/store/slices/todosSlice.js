import {createSlice} from "@reduxjs/toolkit";

import {addTodo, changeTodoStatus, deleteTodo, fetchTodos, restoreTodo} from "../thunks/todoThunks";

const initialState = {
    todos: [],
    quantity: {
        all: 0,
        deleted: 0
    },
    statuses: [
        {
            id: 'active',
            label: 'Active',
            color: 'green'
        },
        {
            id: 'done',
            label: 'Done',
            color: 'blue'
        },
        {
            id: 'hold',
            label: 'Hold',
            color: 'grey'
        },
        {
            id: 'deleted',
            label: 'Deleted',
            color: 'red'
        }
    ],
    isFetching: false,
    isInitialFetch: true,
    error: null
}


const todosSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        setIsInitialFetch(state, {payload}) {
            state.isInitialFetch = payload
        },
        resetQty(state) {
            state.quantity = {
                all: 0,
                deleted: 0
            }
        },
        setTodosError(state, {payload}) {
            state.error = payload
        },
        resetTodosError(state) {
            state.error = null
        }
    },
    extraReducers: {
        [addTodo.pending]: (state) => {
            state.isFetching = true
        },
        [addTodo.fulfilled]: (state, {payload}) => {
            debugger
            if (!payload.error) {
                state.todos.push(payload)
                state.quantity['all'] += 1
                state.quantity['active'] += 1
                state.isFetching = false
            } else {
                state.error = payload.error
                state.isFetching = false
            }

        },
        [fetchTodos.pending]: (state) => {
            state.isFetching = true
        },
        [fetchTodos.fulfilled]: (state, {payload}) => {
            const loadedTodos = []
            if (payload.todos) {
                const todos = payload.todos
                todos.forEach(t => {
                    state.quantity[t.status] = state.quantity[t.status] ?
                        state.quantity[t.status] + 1 : 1

                    state.quantity['all'] =
                        t.status !== 'deleted' ?
                            state.quantity['all'] + 1 :
                            state.quantity['all']

                    loadedTodos.push({
                        id: t._id,
                        title: t.title,
                        description: t.description,
                        status: t.status,
                        oldStatus: t.oldStatus,
                        author: t.author,
                        createdAt: t.createdAt,
                        finishDate: t.finishDate
                    })
                })
                state.todos = loadedTodos
                state.isFetching = false
                state.isInitialFetch = false
            } else {
                state.error = payload.error
                localStorage.removeItem('token')
                state.isFetching = false
                state.isInitialFetch = false
            }

        },
        [changeTodoStatus.pending]: (state) => {
            state.isFetching = true
        },
        [changeTodoStatus.fulfilled]: (state, {payload}) => {
            if(!payload.error) {
                const todo = state.todos.find(t => t.id === payload.id)
                todo.oldStatus = todo.status
                todo.status = payload.newStatus
                state.quantity[todo.oldStatus] -= 1
                state.quantity[payload.newStatus] = state.quantity[payload.newStatus] + 1 || 1
                if (todo.status === 'deleted') {
                    state.quantity.all += 1
                }
                if (payload.newStatus === 'deleted') {
                    state.quantity.all -= 1
                }
                state.isFetching = false
            } else {
                state.isFetching = false
                state.error = payload.error
            }


        },
        // [deleteTodo.pending]: (state) => {
        //     state.isFetching = true
        // },
        // [deleteTodo.fulfilled]: (state, {payload}) => {
        //     const todo = state.todos.find(t => t.id === payload.id)
        //     todo.oldStatus = todo.status
        //     todo.status = 'deleted'
        //     state.quantity[todo.oldStatus] -= 1
        //     state.quantity['deleted'] += 1
        //     state.quantity['all'] -= 1
        //     state.isFetching = false
        // },
        // [restoreTodo.pending]: (state) => {
        //     state.isFetching = true
        // },
        // [restoreTodo.fulfilled]: (state, {payload}) => {
        //     const todo = state.todos.find(t => t.id === payload.id)
        //     todo.status = todo.oldStatus
        //     state.quantity[todo.status] += 1
        //     state.quantity['deleted'] -= 1
        //     state.quantity['all'] += 1
        //     state.isFetching = false
        // }
    }
})

export const todosActions = todosSlice.actions

const todosReducer = todosSlice.reducer

export default todosReducer
