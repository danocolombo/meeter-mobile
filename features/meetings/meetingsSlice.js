import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { printObject } from '../../util/helpers';

export const getActiveMeetings = createAsyncThunk(
    'meetings/getActiveMeetings',
    async (name, thunkAPI) => {
        try {
            console.log('name:', name);
            const config = {
                headers: {
                    'Access-Control-Allow-Headers':
                        'Content-Type, x-auth-token, Access-Control-Allow-Headers',
                    'Content-Type': 'application/json',
                },
            };
            let obj = {
                operation: 'getMeetingsOnAfterDate',
                payload: {
                    clientId: 'wbc',
                    date: '2022-05-12',
                    direction: 'ASC',
                },
            };
            let body = JSON.stringify(obj);
            let api2use =
                'https://2byneyioe4.execute-api.us-east-1.amazonaws.com/dev/meetings';

            const resp = await axios.post(api2use, body, config);

            //const resp = await axios(url);

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
            console.log('inside thunk\nmeetings:', meetings);
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
            // console.log('meetingSlice:deleteActiveMeeting');
            // console.log('meetingId:', action.payload);
            // printObject('state.activeMeetings', state.activeMeetings);
            const smaller = state.activeMeetings.filter(
                (mtg) => mtg.meetingId !== action.payload
            );
            // printObject('smaller', smaller);
            // console.log(
            //     'before filter\nstate.activeMeetings:',
            //     state.activeMeetings
            // );
            // const reducedList = state.activeMeetings.filter((mtg) => {
            //     mtg.meetingId === action.payload;
            // });
            // console.log('reducedList:\n', reducedList);
            state.activeMeetings = smaller;
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
    },
});

export const {
    increment,
    decrement,
    reset,
    incrementByAmount,
    deleteActiveMeeting,
} = meetingsSlice.actions;

export default meetingsSlice.reducer;
