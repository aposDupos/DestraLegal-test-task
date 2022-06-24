import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    isModalShown: false,
    error: '',
    loading: false
}

const commonSlice = createSlice({
    name: 'common',
    initialState,
    reducers: {
        setError(state, action){
            state.error = action.payload
        },
        removeError(state){
            state.error = ''
        },
        setLoading(state){
            state.loading = true
        },
        removeLoading(state){
            state.loading = false
        }
    }
})

export const {toggleModal, setError, removeError} = commonSlice.actions
export default commonSlice.reducer