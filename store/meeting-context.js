import { createContext, useReducer } from 'react';
import { ACTIVE_MEETINGS } from '../constants/data/active';
import { MEETINGS } from '../constants/data/meetings';
import { getToday } from '../util/helpers';
import { MeeterContext } from './meeter-context';
//   ---------------------------------
//todo -- can we make this blank [] ?
//   ---------------------------------
const INITIAL_STATE = [
    {
        meetingId: 'x1',
        meetingDate: '2022-04-20',
        meetingType: 'special',
        title: 'test',
        supportContact: 'tbd',
        attendanceCount: 0,
        mealCount: 0,
        meal: 'tbd',
    },
];

export const MeetingsContext = createContext({
    meetings: [],

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
    getActiveMeetings: () => {},
    deleteMeeting: (meetingId) => {},
    loadMeetings: () => {},
});
function meetingReducer(state, action, navigation) {
    switch (action.type) {
        case 'ACTIVES':
            return ACTIVE_MEETINGS;
        case 'SAVE_MEETINGS':
            return action.payload;
        case 'LOAD':
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
            return state.filter(
                (meeting) => meeting.meetingId !== action.payload
            );
        case 'UPDATE':
            //find meeting to update
            const updatableIndex = state.findIndex(
                (meeting) => meeting.meetingId === action.payload.meetingId
            );
            const meetingToUpdate = state[updatableIndex];
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
function MeetingsContextProvider({ children }) {
    //logic here
    const [meetingsState, dispatch] = useReducer(meetingReducer, INITIAL_STATE);

    function addMeeting(meetingData) {
        dispatch({ type: 'ADD', payload: meetingData });
    }
    function deleteMeeting(id) {
        dispatch({ type: 'DELETE', payload: id });
    }
    function updateMeeting(meetingId, meetingData) {
        dispatch({
            type: 'UPDATE',
            payload: { meetingId: meetingId, data: meetingData },
        });
    }
    function saveMeetings(meetingData) {
        dispatch({ type: 'SAVE_MEETINGS', payload: meetingData });
    }
    function loadMeetings() {
        dispatch({ type: 'LOAD' });
    }
    function getActiveMeetings() {
        dispatch({ type: 'ACTIVES' });
    }

    // need this to expose these contents to anyone using context
    const value = {
        meetings: meetingsState,
        addMeeting: addMeeting,
        deleteMeeting: deleteMeeting,
        updateMeeting: updateMeeting,
        loadMeetings: loadMeetings,
        saveMeetings: saveMeetings,
        getActiveMeetings: getActiveMeetings,
    };
    return (
        <MeetingsContext.Provider value={value}>
            {children}
        </MeetingsContext.Provider>
    );
}
export default MeetingsContextProvider;
