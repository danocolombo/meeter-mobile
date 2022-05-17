import { createContext, useReducer } from 'react';
import { ACTIONS } from '../constants/actions';
//import { ACTIVE_MEETINGS } from '../constants/data/active';
//import { MEETINGS } from '../constants/data/meetings';

import { getToday, printObject } from '../util/helpers';
//   ---------------------------------
//todo -- can we make this blank [] ?
//   ---------------------------------
const INITIAL_STATE = [
    {
        meetingId: 'x1',
    },
];
const _INITIAL_STATE = [
    {
        announcementsContact: '',
        attendanceCount: 0,
        mtgCompKey: '',
        avContact: '',
        cafeContact: '',
        cafeCount: 0,
        childrenContact: '',
        childrenCount: 0,
        cleanupContact: '',
        clientId: 'wbc',
        closingContact: '',
        donations: 0,
        facilitatorContact: '',
        greeterContact1: '',
        greeterContact2: '',
        meal: '',
        mealContact: '',
        mealCount: 0,
        meetingDate: '2022-05-30',
        meetingId: 'x1',
        meetingType: 'Special',
        newcomersCount: 0,
        notes: '',
        nurseryContact: '',
        nurseryCount: 0,
        resourceContact: '',
        securityContact: '',
        setupContact: '',
        supportContact: '',
        title: 'INITIAL_STATE',
        transportationContact: '',
        transportationCount: 0,
        worship: '',
        youthContact: '',
        youthCount: 0,
    },
];

export const MeetingsContext = createContext({
    meetings: [],
    activeMeetings: [],
    historicMeetings: [],
    addMeeting: ({
        meetingId,
        meetingDate,
        meetingType,
        title,
        supportingContact,
        attendanceCount,
        mealCount,
        meal,
    }) => {},
    updateMeeting: (
        meetingId,
        {
            meetingDate,
            meetingType,
            title,
            supportingContact,
            attendanceCount,
            mealCount,
            meal,
        }
    ) => {},
    updateHistoricMeeting: () => {},
    updateActiveMeeting: () => {},
    getActiveMeetings: () => {},
    deleteMeeting: () => {},
    // updateActiveMeeting:
    //     (meetingId,
    //     {
    //         meetingDate,
    //         meetingType,
    //         title,
    //         supportingContact,
    //         attendanceCount,
    //         mealCount,
    //         meal,
    //     }),
    // updateHistoricMeeting:
    //     (meetingId,
    //     {
    //         meetingDate,
    //         meetingType,
    //         title,
    //         supportingContact,
    //         attendanceCount,
    //         mealCount,
    //         meal,
    //     }),
    loadMeetings: () => {},
    saveMeetings: () => {},
});
function meetingsReducer(state, action, navigation) {
    switch (action.type) {
        case 'ACTIVES':
            return ACTIVE_MEETINGS;

        case 'LOAD':
        case 'SAVE_MEETINGS':
            //get the data and sort it.
            let newArray = [];
            MEETINGS.forEach((item) => {
                newArray.push(item);
            });

            function custom_sort(a, b) {
                return (
                    new Date(a.meetingDate).getTime() -
                    new Date(b.meetingDate).getTime()
                );
            }
            let newSort = newArray.sort(custom_sort);
            return newSort;

        case 'ADD':
            //create the unique id
            //   =========================================
            //todo ===>>>> done here? or passed to API??
            //   =========================================
            const id = new Date().toString() + Math.random().toString();
            let newState = [{ ...action.payload, meetingId: id }, ...state];
            // now sort the list
            let sortedState = newState.sort((a, b) =>
                a.meetingDate > b.meetingDate
                    ? 1
                    : a.meetingDate === b.meetingDate
                    ? a.title > b.title
                        ? 1
                        : -1
                    : -1
            );
            return sortedState;
        case 'DELETE':
            console.log(
                'meeting-context DELETE action.payload',
                action.payload
            );
            printObject('state', state);
            const newMtgList = state.activeMeetings.filter((mtg) => {
                meeting.meetingId !== action.payload;
            });
            let newMtgState = { ...state, activeMeetings: newMtgList };
            return newMtgState;

        case 'UPDATE':
            console.log('action.payload:\n', action.payload);

            //find meeting to update
            const updatableIndex = state.findIndex(
                (meeting) => meeting.meetingId === action.payload.meetingId
            );
            const meetingToUpdate = state[updatableIndex];
            return state;
            const updatedMeeting = {
                ...meetingToUpdate,
                ...action.payload.data,
            };
            const updatedMeetings = [...state];
            updatedMeetings[updatableIndex] = updatedMeeting;
            return updatedMeetings;
        default:
            return state;
    }
}
function historicReducer(historicState, action) {
    switch (action.type) {
        case ACTIONS.SAVE_HISTORIC_MEETINGS:
            return action.payload;
        case ACTIONS.UPDATE_HISTORIC_MEETING:
            return action.payload;
        default:
            return historicState;
    }
}
function activeReducer(activeState, action) {
    switch (action.type) {
        case ACTIONS.SAVE_ACTIVE_MEETINGS:
            return action.payload;
        case ACTIONS.UPDATE_ACTIVE_MEETING:
            // let am = activeState.activeMeetings;
            // console.log(am);
            printObject('state', state);
            return activeState;

            //find meeting to update
            const updatableIndex = activeState.activeMeetings.findIndex(
                (meeting) => meeting.meetingId === action.payload.meetingId
            );
            const meetingToUpdate = activeState.activeMeetings[updatableIndex];
            const updatedMeeting = {
                ...meetingToUpdate,
                ...action.payload.data,
            };
            const updatedMeetings = [...activeState.activeMeetings];
            updatedMeetings[updatableIndex] = updatedMeeting;
            return updatedMeetings;

        // return action.payload;
        default:
            return activeState;
    }
}
function MeetingsContextProvider({ children }) {
    //logic here
    //const [meetingsState, dispatch] = useReducer(meetingReducer, INITIAL_STATE);
    const [meetingsState, dispatch] = useReducer(meetingsReducer, {});
    const [activeState, activeDispatch] = useReducer(activeReducer, {});
    const [historicState, historicDispatch] = useReducer(historicReducer, {});
    function saveMeetings(meetingData) {
        dispatch({
            type: 'SAVE_MEETINGS',
            payload: { data: meetingData },
        });
    }
    function addMeeting(meetingData) {
        dispatch({ type: 'ADD', payload: meetingData });
    }
    function deleteMeeting(id) {
        dispatch({ type: 'DELETE', payload: id });
    }
    function updateActiveMeeting(meetingId, meetingData) {
        activeDispatch({
            type: ACTIONS.UPDATE_ACTIVE_MEETING,
            payload: { meetingId: meetingId, data: meetingData },
        });
    }
    function updateHistoricMeeting(meetingId, meetingData) {
        historicDispatch({
            type: ACTIONS.UPDATE_HISTORIC_MEETING,
            payload: { meetingId: meetingId, data: meetingData },
        });
    }
    function loadMeetings() {
        dispatch({ type: 'LOAD' });
    }
    function getActiveMeetings() {
        dispatch({ type: 'ACTIVES' });
    }
    function saveActiveMeetings(meetingData) {
        activeDispatch({
            type: ACTIONS.SAVE_ACTIVE_MEETINGS,
            payload: meetingData,
        });
    }
    function saveHistoricMeetings(meetingData) {
        historicDispatch({
            type: ACTIONS.SAVE_HISTORIC_MEETINGS,
            payload: meetingData,
        });
    }

    // need this to expose these contents to anyone using context
    const value = {
        meetings: meetingsState,
        activeMeetings: activeState,
        historicMeetings: historicState,
        addMeeting: addMeeting,
        deleteMeeting: deleteMeeting,
        updateActiveMeeting: updateActiveMeeting,
        updateHistoricMeeting: updateHistoricMeeting,
        loadMeetings: loadMeetings,
        saveMeetings: saveMeetings,
        getActiveMeetings: getActiveMeetings,
        saveActiveMeetings: saveActiveMeetings,
        saveHistoricMeetings: saveHistoricMeetings,
    };
    return (
        <MeetingsContext.Provider value={value}>
            {children}
        </MeetingsContext.Provider>
    );
}
export default MeetingsContextProvider;
