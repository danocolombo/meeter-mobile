import { ACTIONS } from '../../constants/actions';
import { UPDATE_USERNAME } from '../../actions/user';
const user = (user = { username: '' }, action) => {
    switch (action.type) {
        case ACTIONS.UPDATE_USERNAME:
            return { username: action.username };
        default:
            return user;
    }
};
export default combineReducers({ user });
