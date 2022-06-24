import {configureStore} from "@reduxjs/toolkit";
import rootReducer from "@/store/slices";
import {authApi} from "@/store/api/authApi";
import {contentApi} from "@/store/api/contentApi";

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authApi.middleware, contentApi.middleware),
})