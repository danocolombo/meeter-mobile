import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { printObject } from '../../util/helpers';
import { getToday } from '../../util/helpers';
export const getActiveMeetings = createAsyncThunk(
    'meetings/getActiveMeetings',
    async (meetings, thunkAPI) => {
        try {
            // console.log('inside getActiveMeetings');
            const config = {
                headers: {
                    'Access-Control-Allow-Headers':
                        'Content-Type, x-auth-token, Access-Control-Allow-Headers',
                    'Content-Type': 'application/json',
                },
            };
            const today = getToday();
            // console.log('today', today);
            let obj = {
                operation: 'getMeetingsOnAfterDate',
                payload: {
                    clientId: 'wbc',
                    date: today,
                    direction: 'ASC',
                },
            };
            let body = JSON.stringify(obj);
            // printObject('body', body);
            let api2use =
                'https://2byneyioe4.execute-api.us-east-1.amazonaws.com/dev/meetings';

            const resp = await axios.post(api2use, body, config);

            //const resp = await axios(url);
            // printObject('meetings(1)', resp);
            return resp.data.body.Items;
        } catch (error) {
            return thunkAPI.rejectWithValue('something went wrong');
        }
    }
);
export const saveActiveMeetings = createAsyncThunk(
    'meetings/saveActiveMeetings',
    async (meetings, thunkAPI) => {
        try {
            return meetings;
        } catch (error) {
            return thunkAPI.rejectWithValue('something went wrong');
        }
    }
);
//deleteActiveMeeting;

export const meetingsSlice = createSlice({
    name: 'meetings',
    initialState: {
        count: 88,
        activeMeetings: [],
        historicMeetings: [],
        isLoading: null,
    },
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
        deleteActiveMeeting: (state, action) => {
            const smaller = state.activeMeetings.filter(
                (mtg) => mtg.meetingId !== action.payload
            );
            state.activeMeetings = smaller;
            return state;
        },
        addActiveMeeting: (state, action) => {
            // get meetings
            // add payload meeting
            const bigger = [...state.activeMeetings, action.payload];
            printObject('bigger', bigger);

            // sort
            // return
            return state;
        },
    },
    extraReducers: {
        [saveActiveMeetings.pending]: (state) => {
            state.isLoading = true;
        },
        [saveActiveMeetings.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.activeMeetings = action.payload;
        },
        [saveActiveMeetings.rejected]: (state, action) => {
            console.log(action);
            console.log('yep, we got rejected...');
            state.isLoading = false;
        },
        [getActiveMeetings.pending]: (state) => {
            state.isLoading = true;
        },
        [getActiveMeetings.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.activeMeetings = action.payload;
        },
        [getActiveMeetings.rejected]: (state, action) => {
            printObject('action', action);
            console.log('yep, we got rejected...');
            state.isLoading = false;
        },
    },
});

export const {
    increment,
    decrement,
    reset,
    incrementByAmount,
    deleteActiveMeeting,
    addActiveMeeting,
} = meetingsSlice.actions;

export default meetingsSlice.reducer;
