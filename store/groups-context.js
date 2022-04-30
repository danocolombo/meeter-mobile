import { createContext, useReducer } from 'react';
import { GROUPS } from '../constants/data/groups';
//   ---------------------------------
//todo -- can we make this blank [] ?
//   ---------------------------------
const INITIAL_STATE = [
    {
        groupId: 'x1',
        meetingId: 'm1',
        title: 'sample',
        gender: 'x',
        facilitator: 'Jean',
        cofacilitator: 'Kelly',
        location: 'tbd',
        attendance: 0,
        notes: '',
    },
];

export const GroupsContext = createContext({
    groups: [],
    addGroup: ({
        groupId,
        meetingId,
        title,
        gender,
        facilitator,
        cofacilitator,
        location,
        attendance,
        notes,
    }) => {},
    updateGroup: (
        groupId,
        {
            meetingId,
            title,
            gender,
            facilitator,
            cofacilitator,
            location,
            attendance,
            notes,
        }
    ) => {},
    getGroups: () => {},
    deleteGroup: (groupId) => {},
    loadGroups: () => {},
});
function groupsReducer(state, action, navigation) {
    switch (action.type) {
        case 'LOAD':
            return GROUPS;
        case 'ADD':
            //console.log('IN ADD\n', action.payload, '\n=======');
            const id = new Date().toString() + Math.random().toString();
            return [{ ...action.payload, groupId: id }, ...state];
        case 'DELETE':
            return state.filter((group) => group.groupId === action.payload);
        case 'UPDATE':
            //find group to update
            const updatableIndex = state.findIndex(
                (group) => group.groupId === action.payload.groupId
            );
            const groupToUpdate = state[updatableIndex];
            const updatedGroup = {
                ...groupToUpdate,
                ...action.payload.data,
            };
            const updatedGroups = [...state];
            updatedGroups[updatableIndex] = updatedGroup;
            return updatedGroups;
        case 'GET_GROUPS':
            //get all the groups for a meeting
            return state.map(
                (group) => group.meetingId === action.payload.meetingId
            );
        default:
            return state;
    }
}
function GroupsContextProvider({ children }) {
    //logic here
    const [groupsState, dispatch] = useReducer(groupsReducer, INITIAL_STATE);

    function addGroup(groupData) {
        //console.log('addGroup()groupData:\n', groupData, '\n-----------');
        dispatch({ type: 'ADD', payload: groupData });
    }
    function deleteGroup(id) {
        dispatch({ type: 'DELETE', payload: id });
    }
    function updateGroup(groupId, groupData) {
        dispatch({
            type: 'UPDATE',
            payload: { groupId: groupId, data: groupData },
        });
    }
    function getGroups(meetingId) {
        dispatch({
            type: 'GET_GROUPS',
            payload: { meetingId: meetingId },
        });
    }
    function loadGroups() {
        dispatch({ type: 'LOAD' });
    }

    // need this to expose these contents to anyone using context
    const value = {
        groups: groupsState,
        addGroup: addGroup,
        deleteGroup: deleteGroup,
        updateGroup: updateGroup,
        loadGroups: loadGroups,
        getGroups: getGroups,
    };
    return (
        <GroupsContext.Provider value={value}>
            {children}
        </GroupsContext.Provider>
    );
}
export default GroupsContextProvider;
