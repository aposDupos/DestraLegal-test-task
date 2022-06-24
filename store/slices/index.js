import {combineReducers} from "@reduxjs/toolkit";
import authSlice from "@/store/slices/authSlice";
import commonSlice from "@/store/slices/commonSlice";
import {authApi} from "@/store/api/authApi";
import {contentApi} from "@/store/api/contentApi";

const rootReducer = combineReducers({
    auth: authSlice,
    common: commonSlice,
    [authApi.reducerPath]: authApi.reducer,
    [contentApi.reducerPath]: contentApi.reducer
})

export default rootReducer