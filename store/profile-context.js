import { createContext, useReducer } from 'react';

export const ProfileContext = createContext({
    profile: { firstName, lastName, street, city, postalCode, stateProv },
    updateProfile: () => {},
});

function profileReducer(state, action) {
    switch (action.type) {
        case 'UPDATE':
            return state;
        default:
            return state;
    }
}
function ProfileContextProvider({ children }) {
    // add logic here
    const [profileState, dispatch] = useReducer(profileReducer);

    function updateProfile(profileData) {
        dispatch({ type: 'UPDATE', payload: profileData });
    }
    return <ProfileContext.Provider>{children}</ProfileContext.Provider>;
}
export default ProfileContextProvider;
