import { mainApi } from '@shared/lib/store/api';
import { LoginProps, RegisterProps, ResponseProps } from '@features/auth/lib';

export const authApi = mainApi.injectEndpoints({
    endpoints: (build) => ({
        login: build.mutation<LoginProps, ResponseProps>({
            query: (data) => ({
                url: `/auth/login/`,
                method: 'POST',
                body: data,
            }),
        }),
        register: build.mutation<RegisterProps, ResponseProps>({
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
