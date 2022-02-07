import {createAsyncThunk} from "@reduxjs/toolkit";


const baseUrl = process.env.REACT_APP_BASE_REST_API_URL


export const fetchTodos = createAsyncThunk(
    'todos/fetchTodos',
    async (userId) => {
        try {
            const authString = `Bearer ${localStorage.getItem('token')}`
            const response = await fetch(`${baseUrl}/todos/my-todos/${userId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${authString}`
                }
            })
            const data = await response.json()
            if (data.success) {
                return {todos: data.todos, userId}
            } else {
                return {error: data.message}
            }
        } catch (e) {
            return {
                error: "Something went wrong, try again later"
            }
        }
    }
)

export const addTodo = createAsyncThunk(
    'todos/addTodo',
    async ({todo}) => {
        try {
            const authString = `Bearer ${localStorage.getItem('token')}`
            const response = await fetch(`${baseUrl}/todos/add-todo`, {
                method: 'POST',
                body: JSON.stringify(todo),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${authString}`
                }
            })
            const responseData = await response.json()
            const todoObj = responseData.todo
            return {
                id: todoObj._id,
                title: todoObj.title,
                description: todoObj.description,
                status: todoObj.status,
                oldStatus: todoObj.oldStatus,
                author: todoObj.author,
                createdAt: todoObj.createdAt,
                finishDate: todoObj.finishDate
            }
        } catch (e) {
            return {
                error: "Something went wrong, please try again later"
            }
        }

    }
)

export const changeTodoStatus = createAsyncThunk(
    'todos/changeStatus',
    async ({id, newStatus, oldStatus}) => {
        try {
            const authString = `Bearer ${localStorage.getItem('token')}`
            await fetch(`${baseUrl}/todos/change-status`, {
                method: 'POST',
                body: JSON.stringify({
                    todoId: id,
                    newStatus,
                    oldStatus
                }),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${authString}`
                }
            })
            return {id, newStatus}
        } catch (e) {
            return {
                error: "Something went wrong, please try again later"
            }
        }
    }
)

// export const deleteTodo = createAsyncThunk(
//     'todos/deleteTodo',
//     async ({id, status}) => {
//         try {
//             await fetch(`${dbUrl}/todos/${id}.json`, {
//                 method: 'PATCH',
//                 body: JSON.stringify({
//                     oldStatus: status,
//                     status: 'deleted',
//                 }),
//                 headers: {
//                     'Content-Type': 'application/json'
//                 }
//             })
//             return {id}
//         } catch (e) {
//             console.log(e.message)
//         }
//     }
// )
//
// export const restoreTodo = createAsyncThunk(
//     'todos/restoreTodo',
//     async ({id, oldStatus}) => {
//         try {
//             await fetch(`${dbUrl}/todos/${id}.json`, {
//                 method: 'PATCH',
//                 body: JSON.stringify({
//                     status: oldStatus,
//                 }),
//                 headers: {
//                     'Content-Type': 'application/json'
//                 }
//             })
//             return {id, oldStatus}
//         } catch (e) {
//             console.log(e.message)
//         }
//     }
//
// )
//
//


