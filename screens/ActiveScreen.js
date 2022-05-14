import axios from 'axios';
import { useEffect, useState, useContext } from 'react';
import { useQuery } from 'react-query';
import { useSelector, useDispatch } from 'react-redux';
import { MEETER_API } from '@env';
import { AuthContext } from '../store/auth-context';
import { MeetingsContext } from '../store/meeting-context';
import { GroupsContext } from '../store/groups-context';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import MeetingsOutput from '../components/Meeting/MeetingsOutput';
import NextMeetingCard from '../components/Meeting/NextMeetingCard';
import { fetchActiveMeetings } from '../providers/meetings';
import { saveActiveMeetings } from '../features/meetings/meetingsSlice';
import { subtractMonths } from '../util/date';
import { getGroupsAfterCompKey } from '../providers/groups';
import { DatePickerAndroid, StyleSheet, Text, View } from 'react-native';
import { GOOGLE_AUTH } from '@env';

function ActiveScreen() {
    const activeReduxMeetings = useSelector((state) => state.activeMeetings);
    const [isLoading, setIsLoading] = useState(false);
    const [activeMeetings, setActiveMeetings] = useState(activeReduxMeetings);
    const [historicMeetings, setHistoricMeetings] = useState([]);
    const [fetchedMessage, setFetchedMessage] = useState();
    const authCtx = useContext(AuthContext);
    const meetingsCtx = useContext(MeetingsContext);
    const groupsCtx = useContext(GroupsContext);
    const token = authCtx.token;
    const counter = useSelector((state) => state.count);
    // const activeReduxMeetings = useSelector((state) => state.activeMeetings);
    const dispatch = useDispatch();
    useEffect(() => {
        axios
            .get(
                'https://meeter7-app-default-rtdb.firebaseio.com/message.json?auth=' +
                    token
            )
            .then((response) => {
                setFetchedMessage(response.data);
            });
    }, [token]);
    useEffect(() => {
        setActiveMeetings(activeReduxMeetings);
    }, [activeReduxMeetings]);

    //   ------------------------------------
    //   fetch the active meetings
    //   ------------------------------------
    const { data, status } = useQuery(['actives', status], () =>
        fetchActiveMeetings()
    );
    if (status === 'loading') {
        return <LoadingOverlay />;
    } else if (status === 'error') {
        console.log('ERROR getting active meetings');
        return (
            <View>
                <Text>Error getting active meetings</Text>
            </View>
        );
    } else {
        if (data.status === '200') {
            // 200 from getActive Meetings, save and continue...
            if (
                //only load meetings if we are empty...
                meetingsCtx.activeMeetings.length === undefined ||
                meetingsCtx.activeMeetings.length < 1
            ) {
                //save meetings to redux
                dispatch(saveActiveMeetings(data.body.Items));
                meetingsCtx.activeMeetings = data.body.Items;
                return (
                    <View style={styles.rootContainer}>
                        <NextMeetingCard nextMeeting={data.body.Items[0]} />
                        <Text style={styles.title}>Welcome!</Text>

                        <MeetingsOutput meetings={data.body.Items} />
                        {/* <MeetingsOutput meetings={activeMeetings} /> */}
                    </View>
                );
            }
        }
    }
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
