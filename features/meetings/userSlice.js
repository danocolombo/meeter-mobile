import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        authToken: null,
        userName: null,
    },
    reducers: {
        loadUser: (state, action) => {
            state.authToken = action.payload.token;
            state.userName = action.payload.userName;
        },
    },
});

export const { loadUser } = userSlice.actions;

export default userSlice.reducer;
