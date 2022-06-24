import {fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {ACCESS_TOKEN, DEFAULT_PATH, REFRESH_TOKEN} from "@/constants/index";
import {logOut} from "@/store/slices/authSlice";

const baseQuery = fetchBaseQuery({
    baseUrl: DEFAULT_PATH,
})
export const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions)
    if (result.error && result.error.status === 401) {
        // try to get a new token
        const refreshResult = await baseQuery({
            url: '/refresh', method: "POST",
            headers: {
                'x-refresh-token': localStorage.getItem(REFRESH_TOKEN)
            }
        }, api, extraOptions)
        if (refreshResult.data) {
            // store the new token
            localStorage.setItem(ACCESS_TOKEN, refreshResult.data.result.access_token)
            // retry the initial query
            result = await baseQuery(args, api, extraOptions)
        } else {
            api.dispatch(logOut())
        }
    }
    return result
}