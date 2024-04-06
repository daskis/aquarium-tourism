import { mainApi } from '@shared/lib/store/api';
import { LoginProps, RegisterProps, ResponseProps } from '@features/auth/lib';

export const authApi = mainApi.injectEndpoints({
    endpoints: (build) => ({
        login: build.mutation<ResponseProps, LoginProps>({
            query: (data) => ({
                url: `/auth/login/`,
                method: 'POST',
                body: data,
            }),
        }),
        register: build.mutation<ResponseProps, RegisterProps>({
            query: (data) => ({
                url: `/auth/register/`,
                method: 'POST',
                body: data,
            }),
        }),
        logout: build.query({
            query: () => ({
                url: `/auth/logout`,
                method: 'GET',
            }),
        }),
    }),
});
export const { useLoginMutation, useRegisterMutation, useLazyLogoutQuery } = authApi;
