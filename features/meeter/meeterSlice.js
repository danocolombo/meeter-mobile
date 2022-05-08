import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    version: '1.0.X',
    count: 0,
    isLoading: true,
};
const meeterSlice = createSlice({
    name: 'meeter',
    initialState,
    reducers: {
        increase: (state) => {
            state.count = state.count + 1;
        },
        reset: (state) => {
            state.count = 0;
        },
    },
});
export const { increase, reset } = meeterSlice.actions;
export default meeterSlice.reducer;
