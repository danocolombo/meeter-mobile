import { createSlice } from '@reduxjs/toolkit';
//import meetings from '../../constants/data/activeMeetings';
import { MEETINGS } from '../../constants/data/meetings';
import { printObject } from '../../util/helpers';
const initialState = {
    activeMeetings: [],
    testResults: false,
};
const activeMeetingSlice = createSlice({
    name: 'activeMeetings',
    initialState,
    reducers: {
        testHit: (state) => {
            state.testResults = !state.testResults;
        },
        reset: (state) => {
            state.testResults = false;
        },
        loadMeetings: (state, payload) => {
            printObject('payload', payload);
            const tmp = payload.map((mtg) => {
                printObject('mtg', mtg);
            });
            return (state.activeMeetings = payload);
        },
    },
});

export const { testHit, reset, loadMeetings } = activeMeetingSlice.actions;
export default activeMeetingSlice.reducer;
