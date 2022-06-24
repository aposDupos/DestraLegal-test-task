import {createSlice} from "@reduxjs/toolkit";
import {ACCESS_TOKEN, REFRESH_TOKEN} from "@/constants/index";

const initialState = {
    isLogged: false,
    user: '',
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logIn(state, action){
            state.isLogged = true
            state.user = action.payload
        },
        logOut(state){
            state.isLogged = false
            state.user = ''
            localStorage.removeItem(ACCESS_TOKEN)
            localStorage.removeItem(REFRESH_TOKEN)
        }
    }
})

export const {logIn, logOut} = authSlice.actions
export default authSlice.reducer