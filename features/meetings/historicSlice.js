import { createSlice } from '@reduxjs/toolkit';
//import meetings from '../../constants/data/activeMeetings';
import { MEETINGS } from '../../constants/data/meetings';
const initialState = {
    historicMeetings: MEETINGS,
};
const historicMeetingSlice = createSlice({
    name: 'historicMeetings',
    initialState,
});

//console.log(activeMeetingSlice);
export default historicMeetingSlice.reducer;
