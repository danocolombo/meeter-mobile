import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const authSlice = createSlice({
    name: 'meeterAuth',

    initialState: {
        token: '',
        isAuthentiecated: false,
        authenticate: () => {},
        setIsAuthenticating: () => {},
        logout: () => {},
    },
    reducers: {
        authenticate: (state, action) => {
            //state.token = action.payload;
            //return state;
        },
        setIsAuthenticating: (state, action) => {
            state.isAuthentiecated = action.payload.value;
        },
        logout: (state) => {
            state.token = null;
            AsyncStorage.removeItem('token');
        },
    },
});
// export const authenticate = authSlice.actions.authenticate;
// export const logout = authSlice.actions.logout;
// export const setIsAuthenticating = authSlice.actions.setIsAuthenticating;
export const { authenticate, logout, setIsAuthenticating } = authSlice.actions;

export default authSlice.reducer;
