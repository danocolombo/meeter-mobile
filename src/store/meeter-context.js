//import { update } from 'lodash';
import { createContext, useReducer } from 'react';
import { ACTIONS } from '../constants/actions';

export const MeeterContext = createContext({
    profile: {},
    configuration: {},
    updateProfile: () => {},
    loadConfigurations: () => {},
    deleteUser: () => {},
    deleteConfigGroup: () => {},
});

function meeterReducer(profileState, action) {
    switch (action.type) {
        case ACTIONS.SET_PROFILE:
            return action.payload;
        default:
            return profileState;
    }
}
function configReducer(configState, action) {
    switch (action.type) {
        case ACTIONS.LOAD_CONFIGURATIONS:
            return {
                ...configState,
                groups: action.payload.defaultGroups,
                users: action.payload.clientUsers,
                configurations: action.payload.configurations,
            };
        case ACTIONS.CONFIG_USER_DELETE:
            return configState;
        case CONFIG_GROUP_DELETE:
            return configState;
        default:
            return configState;
    }
}

function MeeterContextProvider({ children }) {
    // add logic here
    const [profileState, profileDispatch] = useReducer(meeterReducer, {});
    const [configState, configDispatch] = useReducer(configReducer, {});

    function updateProfile(profileData) {
        profileDispatch({ type: ACTIONS.SET_PROFILE, payload: profileData });
    }
    function loadConfigurations(data) {
        configDispatch({ type: ACTIONS.LOAD_CONFIGURATIONS, payload: data });
    }
    function deleteUser(userId) {
        configDispatch({ type: ACTIONS.CONFIG_USER_DELETE, payload: userId });
    }
    function deleteConfigGroup(groupId) {
        configDispatch({ type: ACTIONS.CONFIG_GROUP_DELETE, payload: userId });
    }

    const value = {
        profile: profileState,
        configuration: configState,
        updateProfile: updateProfile,
        loadConfigurations: loadConfigurations,
        deleteUser: deleteUser,
        deleteConfigGroup: deleteConfigGroup,
    };
    return (
        <MeeterContext.Provider value={value}>
            {children}
        </MeeterContext.Provider>
    );
}
export default MeeterContextProvider;
