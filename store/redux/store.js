import { configureStore } from '@reduxjs/toolkit';
import meetingsReducer from '../../features/meetings/meetingsSlice';
import userSlice from '../../features/users/userSlice';
export const store = configureStore({
    reducer: {
        meetings: meetingsReducer,
        user: userSlice,
    },
});
