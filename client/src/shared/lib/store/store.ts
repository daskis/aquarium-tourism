import { configureStore } from '@reduxjs/toolkit';
import { mainApi } from './api/mainApi.ts';
import userSlice from '@features/user/lib/features/userSlice.ts';

export const store = configureStore({
    reducer: {
        [mainApi.reducerPath]: mainApi.reducer,
        user: userSlice,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(mainApi.middleware),
    devTools: true,
});
