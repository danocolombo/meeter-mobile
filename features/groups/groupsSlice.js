import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { printObject } from '../../util/helpers';
import { getToday } from '../../util/helpers';

//   ==============================
//   addGroup
//   ==============================
export const addMeetingGroup = createAsyncThunk(
    'groups/addGroup',
    async (groups, thunkAPI) => {
        console.log('INSIDE slice 05230503');
        try {
            return groups;
        } catch (error) {
            return thunkAPI.rejectWithValue('something went wrong');
        }
    }
);
//   ==============================
//   createSlice
//   ==============================
export const groupsSlice = createSlice({
    name: 'groups',
    initialState: {
        meetingGroups: [],
        isLoading: null,
    },
    reducers: {
        clearGroups: (state, action) => {
            console.log('CLEAR_GROUPS');
            state.meetingGroups = null;
        },
        loadGroups: (state, action) => {
            state.meetingGroups = action.payload;
        },
        shortAddUser: (state, action) => {
            printObject('features action', action);
            const bigger = [...state.meetingGroups, action.payload];
            // ascending sort
            // function asc_sort(a, b) {
            //     return a.gender - b.gender;
            // }
            // let newBigger = bigger.sort(asc_sort);
            state.meetingGroups = bigger;
            // return
            return state;
        },
    },
    extraReducers: {
        [addMeetingGroup.pending]: (state) => {
            state.isLoading = true;
        },
        [addMeetingGroup.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.meetingGroups = action.payload;
        },
        [addMeetingGroup.rejected]: (state, action) => {
            printObject('action', action);
            console.log('yep, we got rejected...');
            state.isLoading = false;
        },
    },
});

export const { loadGroups, shortAddUser, clearGroups } = groupsSlice.actions;

export default groupsSlice.reducer;
