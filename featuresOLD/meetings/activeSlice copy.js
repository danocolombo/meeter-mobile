import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { MEETER_API } from '@env';
// import axios from 'axios';
//import meetings from '../../constants/data/activeMeetings';
import { MEETINGS } from '../../constants/data/meetings';
import { printObject } from '../../util/helpers';

const url = 'https://course-api.com/react-useReducer-cart-project';

const initialState = {
    activeMeetings: [],
    cartItems: [],
    testResults: false,
    isLoading: false,
    gettingIt: false,
};
export const getCartItems = createAsyncThunk(
    'activeMeetings/getCartItems',
    () => {
        const response = fetch(url)
            .then((resp) => resp.json())
            .catch((err) => console.log(err));
        return response;
    }
);

// export const getCartItemsFuture = createAsyncThunk(
//     'activeMeetings/getCartItems',
//     async (name, thunkAPI) => {
//         try {
//             // console.log(name);
//             // console.log(thunkAPI);
//             // console.log(thunkAPI.getState());
//             // thunkAPI.dispatch(openModal());
//             const resp = await axios(url);

//             return resp.data;
//         } catch (error) {
//             return thunkAPI.rejectWithValue('something went wrong');
//         }
//     }
// );
// export const getCartItemsFAIL = createAsyncThunk(
//     'activeMeetings/getCartItems',
//     () => {
//         const config = {
//             headers: {
//                 'Access-Control-Allow-Headers':
//                     'Content-Type, x-auth-token, Access-Control-Allow-Headers',
//                 'Content-Type': 'application/json',
//             },
//         };
//         let obj = {
//             operation: 'getMeetingsOnAfterDate',
//             payload: {
//                 clientId: 'wbc',
//                 date: '2022-05-08',
//                 direction: 'ASC',
//             },
//         };
//         let requestBody = JSON.stringify(obj);
//         let api2use = MEETER_API + '/meetings';
//         // console.log('url', api2use);
//         // console.log('body', body);
//         // console.log('config', config);
//         // return;
//         //   ------------------------------------
//         // const response = axios
//         //     .post(api2use, body, config)
//         //     .then((resp) => resp.json())
//         //     .catch((err) => console.log(err));
//         // return response;
//         //   ------------------------------------
//         const theInit = {
//             method: 'POST',
//             headers: {
//                 'Access-Control-Allow-Headers':
//                     'Content-Type, x-auth-token, Access-Control-Allow-Headers',
//                 'Content-Type': 'application/json',
//             },
//             body: requestBody,
//         };
//         const response = fetch(api2use, theInit)
//             .then((resp) => {
//                 resp.json();
//             })
//             .catch((err) => console.log(err));
//         return response;
//     }
// );
// export const getActiveMeetings = createAsyncThunk(
//     'activeMeetings/getActiveMeetings',
//     async (name, thunkAPI) => {
//         try {
//             // console.log(name);
//             // console.log(thunkAPI);
//             // console.log(thunkAPI.getState());
//             // thunkAPI.dispatch(openModal());

//             const config = {
//                 headers: {
//                     'Access-Control-Allow-Headers':
//                         'Content-Type, x-auth-token, Access-Control-Allow-Headers',
//                     'Content-Type': 'application/json',
//                 },
//             };
//             let obj = {
//                 operation: 'getAllMeetings',
//                 payload: {
//                     clientId: 'wbc',
//                 },
//             };
//             let body = JSON.stringify(obj);
//             let api2use = MEETER_API + '/meetings';

//             const resp = await axios.post(api2use, body, config);

//             return resp.body.Items;
//         } catch (error) {
//             return thunkAPI.rejectWithValue('something went wrong');
//         }
//     }
// );
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
            // nothing
        },
    },
    extraReducers: {
        // [getActiveMeetings.pending]: (state) => {
        //     state.isLoading = true;
        // },
        // [getActiveMeetings.fulfilled]: (state, action) => {
        //     console.log(action);
        //     state.isLoading = false;
        //     // state.activeMeetings = action.payload;
        // },
        // [getActiveMeetings.rejected]: (state, action) => {
        //     console.log(action);
        //     state.gettingIt = true;
        //     state.isLoading = false;
        // },
        [getCartItems.pending]: (state) => {
            state.isLoading = true;
        },
        [getCartItems.fulfilled]: (state, action) => {
            // console.log(action);
            // printObject('AAAAction', action);
            state.isLoading = false;
            state.cartItems = action.payload;
        },
        [getCartItems.rejected]: (state, action) => {
            console.log(action);
            state.isLoading = false;
        },
    },
});

export const { testHit, reset, loadMeetings } = activeMeetingSlice.actions;
export default activeMeetingSlice.reducer;
