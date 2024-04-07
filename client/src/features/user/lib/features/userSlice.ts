import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '@shared/lib';

interface initialState {
    user: {
        img: string;
        username: string;
        email: string;
        token: string;
    };
}

const intitialState: initialState = {
    user: {
        token: '',
        img: '',
        username: '',
        email: '',
    },
};
const userSlice = createSlice({
    name: 'user',
    initialState: intitialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        logoutUser: () => intitialState,
    },
});
export const { setUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;

export const selectCurrentUser = (state: RootState) => state.user.user;
