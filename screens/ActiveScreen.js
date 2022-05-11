import axios from 'axios';
import { useEffect, useState, useContext } from 'react';
import { useQuery } from 'react-query';
import { MEETER_API } from '@env';
import { AuthContext } from '../store/auth-context';
import { MeetingsContext } from '../store/meeting-context';
import { GroupsContext } from '../store/groups-context';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import MeetingsOutput from '../components/Meeting/MeetingsOutput';
import NextMeetingCard from '../components/Meeting/NextMeetingCard';
import {
    getAllMeetings,
    getAllActiveMeetingsForClient,
    getMeetingsBetweenDates,
    fetchActiveMeetings,
    fetchHistoricMeetings,
} from '../providers/meetings';
import { subtractMonths } from '../util/date';
import { getGroupsAfterCompKey } from '../providers/groups';
import { DatePickerAndroid, StyleSheet, Text, View } from 'react-native';
import { GOOGLE_AUTH } from '@env';

function ActiveScreen() {
    const [isLoading, setIsLoading] = useState(false);
    const [activeMeetings, setActiveMeetings] = useState([]);
    const [historicMeetings, setHistoricMeetings] = useState([]);
    const [fetchedMessage, setFetchedMessage] = useState();
    const authCtx = useContext(AuthContext);
    const meetingsCtx = useContext(MeetingsContext);
    const groupsCtx = useContext(GroupsContext);
    const token = authCtx.token;
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

    //   ------------------------------------
    //   fetch the active meetings
    //   ------------------------------------
    const { data, status } = useQuery(['actives', status], fetchActiveMeetings);
    if (status === 'loading') {
        console.log('LOADING');
        return <LoadingOverlay />;
    } else if (status === 'error') {
        console.log('ERROR getting active meetings');
    } else {
        if (data.status === '200') {
            // 200 from getActive Meetings, save and continue...
            if (
                //only load meetings if we are empty...
                meetingsCtx.activeMeetings.length === undefined ||
                meetingsCtx.activeMeetings.length < 1
            ) {
                //save active meetings...
                meetingsCtx.activeMeetings = data.body.Items;
                return (
                    <View style={styles.rootContainer}>
                        <NextMeetingCard nextMeeting={data.body.Items[0]} />
                        <Text style={styles.title}>Welcome!</Text>
                        <MeetingsOutput meetings={data.body.Items} />
                    </View>
                );
            }
        }
        console.log(data);
    }

    return (
        <>
            {isLoading ? (
                <LoadingOverlay />
            ) : (
                <View style={styles.rootContainer}>
                    <NextMeetingCard nextMeeting={activeMeetings[0]} />
                    <Text style={styles.title}>Welcome!</Text>
                    <MeetingsOutput meetings={activeMeetings} />
                </View>
            )}
        </>
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
