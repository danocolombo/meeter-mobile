import { combineReducers } from 'redux';
import meeter from './meeter';
import meetings from './meetings';

export default combineReducers({
    meeter,
    meetings,
});
