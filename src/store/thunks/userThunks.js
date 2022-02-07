import {createAsyncThunk} from "@reduxjs/toolkit";

const baseUrl = process.env.REACT_APP_BASE_REST_API_URL
console.log(baseUrl)

export const setAvatar = createAsyncThunk(
    'auth/setAvatar',
    async(formData) => {
        try {
            const authString = `Bearer ${localStorage.getItem('token')}`
            const response = await fetch(`${baseUrl}/user/set-avatar`, {
                method: 'POST',
                body: formData,
                headers: {
                    "Authorization": authString
                }
            })
            const data = await response.json()
            console.log(data)
        } catch(e) {
            console.log(e)
        }
    }
)
