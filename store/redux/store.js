import { configureStore } from '@reduxjs/toolkit';
import meetingsReducer from '../../features/meetings/meetingsSlice';
export const store = configureStore({
    reducer: {
        meetings: meetingsReducer,
    },
});
