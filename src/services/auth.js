import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
    isAuth: localStorage.getItem("isAuth"),
    phone: localStorage.getItem("phone"),
    token: localStorage.getItem("token")
}

const authSlice = createSlice({
    name: "auth",
    initialState: initialAuthState,
    reducers: {
        login(state, action) {
            state.isAuth = true
            state.phone = action.payload.phone
            state.token = action.payload.token
            localStorage.setItem("isAuth", true)
            localStorage.setItem("phone", action.payload.phone)
            localStorage.setItem("token", action.payload.token)
        },
        logout(state, action){
            state.isAuth = false
            state.phone = null
            state.token = null
            localStorage.clear()
        }
    }
})

export const authAction = authSlice.actions

export default authSlice.reducer