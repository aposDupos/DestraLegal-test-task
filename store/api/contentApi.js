import {createApi} from "@reduxjs/toolkit/dist/query/react";
import {baseQueryWithReauth} from "@/store/api/baseQueryWithReauth";
import {ACCESS_TOKEN} from "@/constants/index";
import {getToken} from "@/utils/getToken";

export const contentApi = createApi({
    reducerPath: 'contentApi',
    baseQuery: (args, api) => baseQueryWithReauth(args, api, {
        prepareHeaders: (headers) => {
            headers.set('x-access-token', getToken(ACCESS_TOKEN))
        }
    }),
    endpoints: (build) => ({
        getContent: build.query({
            query: (page = 1, limit = 10) => ({
                url: "/content",
                params: {
                    page, limit
                },
                headers: {
                    'x-access-token': getToken(ACCESS_TOKEN)
                }
            }),
            transformResponse: (baseQueryReturnValue, meta, arg) => baseQueryReturnValue.result
        }),
        getTotalContent: build.query({
            query: (arg) => ({
                url: "/content/total",
                headers: {
                    'x-access-token': getToken(ACCESS_TOKEN)
                }
            }),
            transformResponse: (baseQueryReturnValue, meta, arg) => baseQueryReturnValue.result.count
        })
    })
})

export const {useGetContentQuery, useGetTotalContentQuery} = contentApi