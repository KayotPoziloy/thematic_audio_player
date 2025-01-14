import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type UserState = {
    currentUser: string | null;
    isAuth: boolean;
};

const isTokenInCookies = document.cookie.includes('token=');

const initialState: UserState = {
    currentUser: null,
    isAuth: isTokenInCookies,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<string | null>) {
            state.currentUser = action.payload;
            state.isAuth = true;
        },

        logout(state) {
            state.currentUser = null;
            state.isAuth = false;
        }
    }
});

export const { setUser, logout } = userSlice.actions;

export default userSlice.reducer;
