import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { printObject } from '../../util/helpers';
import { getToday } from '../../util/helpers';

export const groupsSlice = createSlice({
    name: 'groups',
    initialState: {
        meetingGroups: [],
        isLoading: null,
    },
    reducers: {
        loadGroups: (state, action) => {
            state.activeMeetings = action.payload;
        },
        addGroup: (state, action) => {
            const bigger = [...state.meetingGroups, action.payload];
            // ascending sort
            function asc_sort(a, b) {
                return a.gender - b.gender;
            }
            let newBigger = bigger.sort(asc_sort);
            state.meetingGroups = newBigger;
            // return
            return state;
        },
    },
    extraReducers: {},
});

export const { loadGroups, addGroup } = groupsSlice.actions;

export default groupsSlice.reducer;
