import { createSlice, current, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { printObject } from '../../util/helpers';
import { getToday } from '../../util/helpers';

//   ==============================
//   addGroup
//   ==============================

// export const addMeetingGroup = createAsyncThunk(
//     'groups/addGroup',
//     async (groups, thunkAPI) => {
//         console.log('INSIDE slice 05232226');
//         try {
//             // return groups;
//         } catch (error) {
//             return thunkAPI.rejectWithValue('something went wrong');
//         }
//     }
// );
//   ==============================
//   createSlice
//   ==============================
const initialState = {
    meetingGroups: [],
    isLoading: null,
};
export const groupsSlice = createSlice({
    name: 'groups',
    initialState,
    reducers: {
        resetGroups: (state) => {
            return initialState;
        },
        loadGroups: (state, action) => {
            state.meetingGroups = action.payload;
        },
        removeGroup: (state, action) => {
            let smaller = state.meetingGroups.filter(
                (grp) => grp.groupId !== action.payload
            );
            console.log('smaller size:', smaller.length);
            console.log('smaller', smaller);
            state.meetingGroups = smaller;
            return state;
        },
        addMeetingGroup: (state, action) => {
            printObject('state.meetingGroups', current(state.meetingGroups));
            let grps = current(state.meetingGroups);
            // if (state.meetingGroups) {
            //     console.log('YES');
            // } else {
            //     console.log('FALSE');
            // }

            const bigger = [...state.meetingGroups, action.payload];

            state.meetingGroups = bigger;
            // return
            return state;
        },
        updateMeetingGroup: (state, action) => {
            const newGroups = current(state.meetingGroups).map((grp) => {
                if (grp.groupId === action.payload.groupId) {
                    return action.payload;
                } else {
                    return grp;
                }
            });
            state.meetingGroups = newGroups;
            return state;
        },
    },
    extraReducers: {
        // [addMeetingGroup.pending]: (state) => {
        //     state.isLoading = true;
        // },
        // [addMeetingGroup.fulfilled]: (state, action) => {
        //     state.isLoading = false;
        //     const bigger = [...state.meetingGroups, action.payload];
        //     state.activeMeetings = bigger;
        //     return state;
        // },
        // [addMeetingGroup.rejected]: (state, action) => {
        //     printObject('action', action);
        //     console.log('yep, we got rejected...');
        //     state.isLoading = false;
        // },
    },
});

export const {
    loadGroups,
    shortAddUser,
    addMeetingGroup,
    resetGroups,
    removeGroup,
    updateMeetingGroup,
} = groupsSlice.actions;

export default groupsSlice.reducer;
