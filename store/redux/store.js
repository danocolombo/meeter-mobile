import { configureStore } from '@reduxjs/toolkit';
import activeMeetingReducer from '../../features/meetings/activeSlice';
import historicMeetingReducer from '../../features/meetings/historicSlice';
import meeterReducer from '../../features/meeter/meeterSlice';

const reducer = {
    activeMeetings: activeMeetingReducer,
    historicMeetings: historicMeetingReducer,
    meeter: meeterReducer,
};

export const store = configureStore({
    reducer,
});
