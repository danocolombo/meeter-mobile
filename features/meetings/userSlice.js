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
        loadUser1: (state, action) => {
            state.authToken = action.payload.token;
            state.userName = action.payload.userName;
        },
    },
});

export const { loadUser } = userSlice.actions;

export default userSlice.reducer;
