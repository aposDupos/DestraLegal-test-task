import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {ACCESS_TOKEN, DEFAULT_PATH, REFRESH_TOKEN} from "@/constants/index";
import {logIn, logOut} from "@/store/slices/authSlice";
import jwtDecode from "jwt-decode";
import {getToken} from "@/utils/getToken";

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: DEFAULT_PATH,
        mode: "cors",
        prepareHeaders: (headers) => {
            headers.set('Access-Control-Allow-Origin', 'http://localhost:3000')
            return headers
        }
    }),
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (user) => ({
                url: "/login",
                method: "POST",
                body: user
            }),
            async onQueryStarted(arg, {queryFulfilled, dispatch}) {
                try {
                    const {data} = await queryFulfilled
                    if (data.status === 200) {
                        dispatch(logIn(jwtDecode(data.result.access_token).userId))
                        localStorage.setItem(ACCESS_TOKEN, data.result.access_token)
                        localStorage.setItem(REFRESH_TOKEN, data.result.refresh_token)
                    }
                } catch (e) {
                }
            }
        }),
        refresh: builder.mutation({
            query: (arg) => ({
                url: '/refresh',
                method: "POST",
                headers: {
                    'x-refresh-token': getToken(REFRESH_TOKEN)
                }
            }),
            async onQueryStarted(arg, {queryFulfilled, dispatch}) {
                try {
                    const {data} = await queryFulfilled
                    if (data.status === 200) {
                        localStorage.setItem(ACCESS_TOKEN, data.result.access_token)
                        dispatch(logIn(jwtDecode(data.result.access_token).userId))
                    }
                } catch (e) {
                    dispatch(logOut())
                }
            }
        })
    })
})

export const {useLoginMutation, useRefreshMutation} = authApi