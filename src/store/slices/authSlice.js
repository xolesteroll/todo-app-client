import {createSlice} from "@reduxjs/toolkit";
import {loginThunk, registerThunk, authThunk} from "../thunks/authThunks";

const initialState = {
    isAuth: false,
    email: null,
    firstName: null,
    lastName: null,
    token: null,
    id: null,
    error: null,
    isFetching: false
}

const authDataSetter = (state, payload) => {
    if (!payload.error) {
        state.email = payload.email
        state.token = payload.token
        state.id = payload.id
        state.firstName = payload.firstName
        state.lastName = payload.lastName
        state.isAuth = true
    } else {
        if (payload.error === "jwt expired") {
            state.error = "Your session expired, please login"
        } else {
            state.error = payload.error
        }

    }
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout(state) {
            for (const key in state) {
                if (key !== "isAuth" && key !== "isFetching") {
                    state[key] = null
                } else {
                    state[key] = false
                }
            }
            localStorage.removeItem('token')
        },
        clearError(state) {
            state.error = null
        }
    },
    extraReducers: {
        [loginThunk.pending]: (state) => {
            state.isFetching = true
        },
        [loginThunk.fulfilled]: (state, {payload}) => {

            authDataSetter(state, payload)
            state.isFetching = false
        },
        [registerThunk.pending]: (state) => {
            state.isFetching = true
        },
        [registerThunk.fulfilled]: (state, {payload}) => {
            authDataSetter(state, payload)
            state.isFetching = false
        },
        [authThunk.pending]: (state, {payload}) => {
            state.isFetching = true
        },
        [authThunk.fulfilled]: (state, {payload}) => {
            authDataSetter(state, payload)
            state.isFetching = false
        }
    }
})

export const authActions = authSlice.actions

const authReducer = authSlice.reducer

export default authReducer
