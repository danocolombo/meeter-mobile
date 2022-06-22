import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { printObject, getToday } from '../../util/helpers';
import { getDateMinusDays, subtractMonths } from '../../util/date';
const config = {
    headers: {
        'Access-Control-Allow-Headers':
            'Content-Type, x-auth-token, Access-Control-Allow-Headers',
        'Content-Type': 'application/json',
    },
};
export const getHistoricMeetings = createAsyncThunk(
    'meetings/getHistoricMeetings',
    async (meetings, thunkAPI) => {
        try {
            // console.log('inside getHistoricMeetings');

            const today = getToday();
            const yesterday = getDateMinusDays(today, 1);
            const twoMonthsAgo = subtractMonths(2, today);

            // console.log('today', today);
            let obj = {
                operation: 'getMeetingsOnAfterDate',
                payload: {
                    clientId: 'wbc',
                    startDate: twoMonthsAgo,
                    stopDate: yesterday,
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
export const getActiveMeetings = createAsyncThunk(
    'meetings/getActiveMeetings',
    async (meetings, thunkAPI) => {
        try {
            // console.log('inside getActiveMeetings');
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
        loadHistoricMeetings: (state, action) => {
            state.historicMeetings = action.payload;
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
        getActiveMeeting: (state, action) => {
            const all = state.activeMeetings;
            printObject('all', all);
            const found = all.find((mtg) => {
                return mtg.meetingId === action.payload;
            });
            printObject('found', found);
            return found;
        },
        deleteActiveMeeting: (state, action) => {
            const smaller = state.activeMeetings.filter(
                (mtg) => mtg.meetingId !== action.payload
            );
            state.activeMeetings = smaller;
            return state;
        },
        addActiveMeeting: (state, action) => {
            const bigger = [...state.activeMeetings, action.payload];

            // ascending sort
            function asc_sort(a, b) {
                return (
                    new Date(a.meetingDate).getTime() -
                    new Date(b.meetingDate).getTime()
                );
            }
            let newBigger = bigger.sort(asc_sort);
            state.activeMeetings = newBigger;
            // return
            return state;
        },
        addHistoricMeeting: (state, action) => {
            const bigger = [...state.historicMeetings, action.payload];

            // ascending sort
            function desc_sort(a, b) {
                return (
                    new Date(b.meetingDate).getTime() -
                    new Date(a.meetingDate).getTime()
                );
            }
            let newBigger = bigger.sort(desc_sort);
            state.historicMeetings = newBigger;
            // return
            return state;
        },
        updateActiveMeeting: (state, action) => {
            const newMeetings = state.activeMeetings.map((mtg) => {
                if (mtg.meetingId === action.payload.meetingId) {
                    return action.payload;
                } else {
                    return mtg;
                }
            });
            // ascending sort
            function asc_sort(a, b) {
                return (
                    new Date(a.meetingDate).getTime() -
                    new Date(b.meetingDate).getTime()
                );
            }
            let newBigger = newMeetings.sort(asc_sort);
            state.activeMeetings = newBigger;
            return state;
        },
        updateHistoricMeeting: (state, action) => {
            const newMeetings = state.historicMeetings.map((mtg) => {
                if (mtg.meetingId === action.payload.meetingId) {
                    return action.payload;
                } else {
                    return mtg;
                }
            });
            // descending sort
            function desc_sort(a, b) {
                return (
                    new Date(b.meetingDate).getTime() -
                    new Date(a.meetingDate).getTime()
                );
            }
            let newBigger = newMeetings.sort(desc_sort);
            state.historicMeetings = newBigger;
            return state;
        },
        moveActiveToHistoric: (state, action) => {
            //   remove from activeMeetings
            const smaller = state.activeMeetings.filter(
                (mtg) => mtg.meetingId !== action.payload.meetingId
            );
            state.activeMeetings = smaller;
            //   add to historicMeetings
            const bigger = [...state.historicMeetings, action.payload];
            // ascending sort
            function asc_sort(a, b) {
                return (
                    new Date(a.meetingDate).getTime() -
                    new Date(b.meetingDate).getTime()
                );
            }
            let newBigger = bigger.sort(asc_sort);
            state.historicMeetings = newBigger;
            return state;
        },
        moveHistoricToActive: (state, action) => {
            //   remove from historicMeetings
            const smaller = state.historicMeetings.filter(
                (mtg) => mtg.meetingId !== action.payload.meetingId
            );
            state.historicMeetings = smaller;
            //   add to activeMeetings
            const bigger = [...state.activeMeetings, action.payload];
            // ascending sort
            function asc_sort(a, b) {
                return (
                    new Date(a.meetingDate).getTime() -
                    new Date(b.meetingDate).getTime()
                );
            }
            let newBigger = bigger.sort(asc_sort);
            state.activeMeetings = newBigger;
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
        [getHistoricMeetings.pending]: (state) => {
            state.isLoading = true;
        },
        [getHistoricMeetings.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.historicMeetings = action.payload;
            return state;
        },
        [getHistoricMeetings.rejected]: (state, action) => {
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
    getActiveMeeting,
    updateActiveMeeting,
    updateHistoricMeeting,
    moveActiveToHistoric,
    moveHistoricToActive,
    loadHistoricMeetings,
    addHistoricMeetings,
} = meetingsSlice.actions;

export default meetingsSlice.reducer;
