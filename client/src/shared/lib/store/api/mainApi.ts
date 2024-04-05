import { createApi, BaseQueryFn, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { FetchArgs } from '@reduxjs/toolkit/query/react';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER_URL}`,
    credentials: 'include',
    prepareHeaders: (headers) => {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            headers.set('Authorization', `${accessToken}`);
        }
        return headers;
    },
});

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
    args,
    api,
    extraOptions,
) => {
    let result = await baseQuery(args, api, extraOptions);

    if (result?.error?.status === 401) {
        const refreshResult = await baseQuery('/auth/refresh-tokens', api, extraOptions);

        if (refreshResult?.data) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            const token = refreshResult.data.accessToken;
            localStorage.setItem('accessToken', token);
            result = await baseQuery(args, api, extraOptions);
        } else {
            localStorage.removeItem('accessToken');
        }
    }
    return result;
};

export const mainApi = createApi({
    baseQuery: baseQueryWithReauth,
    endpoints: () => ({}),
    tagTypes: ['User'],
});
