import { useState, useContext } from 'react';
import { Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { loadUser } from '../features/meetings/userSlice';
import {
    saveActiveMeetings,
    getActiveMeetings,
} from '../features/meetings/meetingsSlice';
import AuthContent from '../components/Auth/AuthContent';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { AuthContext } from '../store/auth-context';
import { MeetingsContext } from '../store/meeting-context';
import { fetchActiveMeetings } from '../providers/meetings';
import { login } from '../util/auth';
import { GroupsContext } from '../store/groups-context';

function LoginScreen() {
    const dispatch = useDispatch();
    const [isAuthenticating, setIsAuthenticating] = useState(false);
    const authCtx = useContext(AuthContext);
    const meetingCtx = useContext(MeetingsContext);
    const groupsCtx = useContext(GroupsContext);
    async function loginHandler({ email, password }) {
        setIsAuthenticating(true);
        try {
            const token = await login(email, password);
            authCtx.authenticate(token);
            dispatch(loadUser({ token: token, userName: email }));
            dispatch(getActiveMeetings(), null);
        } catch (error) {
            Alert.alert(
                'Authentication failed!',
                'Could not log you in. Please check your credentials or try again later!'
            );
            setIsAuthenticating(false);
        }
    }

    if (isAuthenticating) {
        return <LoadingOverlay message='Logging you in...' />;
    }

    return <AuthContent isLogin onAuthenticate={loginHandler} />;
}

export default LoginScreen;
