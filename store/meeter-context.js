//import { update } from 'lodash';
import { createContext, useReducer } from 'react';
import { ACTIONS } from '../constants/actions';

export const MeeterContext = createContext({
    profile: {},
    updateProfile: () => {},
});

function meeterReducer(profileState, action) {
    switch (action.type) {
        case ACTIONS.SET_PROFILE:
            return action.payload;
        default:
            return profileState;
    }
}
function MeeterContextProvider({ children }) {
    // add logic here
    const [profileState, profileDispatch] = useReducer(meeterReducer, {});

    function updateProfile(profileData) {
        profileDispatch({ type: ACTIONS.SET_PROFILE, payload: profileData });
    }

    const value = {
        profile: profileState,
        updateProfile: updateProfile,
    };
    return (
        <MeeterContext.Provider value={value}>
            {children}
        </MeeterContext.Provider>
    );
}
export default MeeterContextProvider;
