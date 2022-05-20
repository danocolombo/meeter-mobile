import axios from 'axios';
import { useEffect, useState, useContext } from 'react';
import { useQuery } from 'react-query';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import MeetingsOutput from '../components/Meeting/MeetingsOutput';
import NextMeetingCard from '../components/Meeting/NextMeetingCard';
import { getActiveMeetings } from '../features/meetings/meetingsSlice';
import { fetchActiveMeetings } from '../providers/meetings';
import { saveActiveMeetings } from '../features/meetings/meetingsSlice';
import { DatePickerAndroid, StyleSheet, Text, View } from 'react-native';
import { printObject } from '../util/helpers';

function ActiveScreen() {
    const dispatch = useDispatch();
    const [isLoading1, setIsLoading] = useState(false);
    const isLoading = useSelector((state) => state.meetings.isLoading);
    const authToken = useSelector((state) => state.user.authToken);
    let activeMeetings = useSelector((state) => state.meetings.activeMeetings);
    useEffect(() => {
        // if (authToken.length === null && activeMeetings.length === 0) {
        // dispatch(loadUser({ token: token, userName: email }));
        dispatch(getActiveMeetings(), null);
        // }
    }, []);
    // printObject('activeMeetings', activeMeetings);
    if (activeMeetings.length < 1) {
        return (
            <View>
                <Text>No Meetings</Text>
            </View>
        );
    }
    // console.log('activeMeetings.length', activeMeetings.length);
    return isLoading ? (
        <LoadingOverlay />
    ) : (
        <View style={styles.rootContainer}>
            <NextMeetingCard nextMeeting={activeMeetings[0]} />
            <Text style={styles.title}>Welcome!</Text>
            <MeetingsOutput meetings={activeMeetings} />
        </View>
    );
}

export default ActiveScreen;

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'center',
        padding: 32,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 8,
    },
});
