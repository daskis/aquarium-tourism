import { mainApi } from '@shared/lib/store/api';

export const userApi = mainApi.injectEndpoints({
    endpoints: (build) => ({
        getMe: build.query({
            query: () => ({
                url: `/auth/user/me/`,
                method: 'GET',
            }),
        }),
        getUserById: build.query({
            query: (id: string) => ({
                url: `/users/${id}`,
                method: 'GET',
            }),
        }),
        getChildren: build.query({
            query: (id: string) => ({
                url: `/bot/subusers/${id}/retrive`,
                method: 'GET',
            }),
        }),
    }),
});
export const { useGetMeQuery, useLazyGetUserByIdQuery, useLazyGetChildrenQuery } = userApi;
