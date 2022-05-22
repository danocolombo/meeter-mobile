import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { printObject } from '../../util/helpers';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        authToken: '',
        userId: '',
        userName: '',
        firstName: '',
        lastName: '',
        gender: '',
        email: '',
        activeClient: 'wbc',
        activeRole: 'superuser',
        activeStatus: 'approved',
    },
    reducers: {
        loadUser: (state, action) => {
            // console.log('*******************************');
            // printObject('userSlice - action', action);
            // console.log('*******************************');
            state.authToken = action.payload.token;
            state.userId = action.payload.uid;
            state.userName = action.payload.userName;
            state.firstName = action.payload.firstName;
            state.lastName = action.payload.lastName;
            state.gender = action.payload.gender;
            state.email = action.payload.email;
            return state;
        },
        logout: (state, action) => {
            state.authToken = '';
            state.userId = '';
            state.userName = '';
            state.firstName = '';
            state.lastName = '';
            state.gender = '';
            state.email = '';
        },
        loadUser1: (state, action) => {
            state.authToken = action.payload.token;
            state.userName = action.payload.userName;
        },
    },
});

export const { loadUser, logout } = userSlice.actions;

export default userSlice.reducer;
