import {configureStore} from '@reduxjs/toolkit'
import todosReducer from "./slices/todosSlice";
import authReducer from "./slices/authSlice";


const store = configureStore({
    reducer: {
        auth: authReducer,
        todos: todosReducer
    }
})

export default store
