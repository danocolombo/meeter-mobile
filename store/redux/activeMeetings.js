import { createSlice } from '@reduxjs/toolkit';
import { join } from 'lodash';

const activeMeetings = createSlice({
    name: 'activeMeetings',
    initialState: {
        meetings: [],
    },
    reducers: {
        addActiveMeeting: (state, action) => {
            state.meetings.push(action.payload.meeting);
        },
        removeActiveMeeting: (state) => {
            state.meetings.splice(
                state.meetings.indexOf(action.payload.meeting),
                1
            );
        },
    },
});
export const addActiveMeeting = activeMeetings.actions.addActiveMeeting;
export const removeActiveMeeting = activeMeetings.actions.addActiveMeeting;
export default activeMeetings.reducer;
