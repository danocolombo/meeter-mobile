import { ACTIONS } from '../constants/actions';

export const updateUsername = (username) => ({
    type: ACTIONS.UPDATE_USERNAME,
    username,
});
