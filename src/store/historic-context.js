import { createContext, useReducer } from 'react';
import { ACTIVE_MEETINGS } from '../constants/data/active';
import { HISTORICAL_MEETINGS } from '../constants/data/historical';
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

export const HistoricContext = createContext({
    meetings: [],
    historic: [],
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
    deleteMeeting: (meetingId) => {},
    loadMeetings: () => {},
    loadHistoric: () => {},
});
function meetingReducer(state, action) {
    switch (action.type) {
        case 'LOAD':
            return HISTORICAL_MEETINGS;
        case 'LOAD_HISTORIC':
            return HISTORICAL_MEETINGS;
        case 'ADD':
            //create the unique id
            //   =========================================
            //todo ===>>>> done here? or passed to API??
            //   =========================================
            const id = new Date().toString() + Math.random().toString();
            return [{ ...action.payload, meetingId: id }, ...state];
        case 'DELETE':
            return state.filter(
                (meeting) => meeting.meetingId === action.payload
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
function HistoricContextProvider({ children }) {
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
    function loadMeetings() {
        dispatch({ type: 'LOAD' });
    }
    function loadHistoric() {
        dispatchHistoric({ type: 'LOAD_HISTORIC' });
    }
    // need this to expose these contents to anyone using context
    const value = {
        meetings: meetingsState,
        addMeeting: addMeeting,
        deleteMeeting: deleteMeeting,
        updateMeeting: updateMeeting,
        loadMeetings: loadMeetings,
        loadHistoric: loadHistoric,
    };
    return (
        <HistoricContext.Provider value={value}>
            {children}
        </HistoricContext.Provider>
    );
}
export default HistoricContextProvider;
