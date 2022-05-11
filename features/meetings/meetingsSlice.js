import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    count: 88,
    activeMeetings: [],
    historicMeetings: [],
};

export const meetingsSlice = createSlice({
    name: 'meetings',
    initialState,
    reducers: {
        loadActiveMeetings: (state, action) => {
            state.activeMeetings = action.payload;
        },
        increment: (state) => {
            state.count += 1;
        },
        decrement: (state) => {
            state.count -= 1;
        },
        reset: (state) => {
            state.count = 0;
        },
        incrementByAmount: (state, action) => {
            state.count += action.payload;
        },
    },
});

export const {
    increment,
    decrement,
    reset,
    incrementByAmount,
    loadActiveMeetings,
} = meetingsSlice.actions;

export default meetingsSlice.reducer;
