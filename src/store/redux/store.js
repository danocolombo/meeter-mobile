import { configureStore } from '@reduxjs/toolkit';
import meetingsReducer from '../../features/meetings/meetingsSlice';
import groupsReducer from '../../features/groups/groupsSlice';
import userSlice from '../../features/users/userSlice';
export const store = configureStore({
    reducer: {
        meetings: meetingsReducer,
        groups: groupsReducer,
        user: userSlice,
    },
});
