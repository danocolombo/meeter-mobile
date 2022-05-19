import axios from 'axios';
import { useEffect, useState, useContext } from 'react';
import { useQuery } from 'react-query';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import MeetingsOutput from '../components/Meeting/MeetingsOutput';
import NextMeetingCard from '../components/Meeting/NextMeetingCard';
import { fetchActiveMeetings } from '../providers/meetings';
import { saveActiveMeetings } from '../features/meetings/meetingsSlice';
import { DatePickerAndroid, StyleSheet, Text, View } from 'react-native';
import { GOOGLE_AUTH } from '@env';

function ActiveScreen() {
    const [isLoading1, setIsLoading] = useState(false);
    const isLoading = useSelector((state) => state.meetings.isLoading);
    const authToken = useSelector((state) => state.user.authToken);
    const [fetchedMessage, setFetchedMessage] = useState();

    let activeMeetings = useSelector((state) => state.meetings.activeMeetings);
    const dispatch = useDispatch();

    // useEffect(() => {
    //     if (authToken) {
    //         axios
    //             .get(
    //                 'https://meeter7-app-default-rtdb.firebaseio.com/message.json?auth=' +
    //                     authToken
    //             )
    //             .then((response) => {
    //                 setFetchedMessage(response.data);
    //             });
    //     }
    // }, [authToken]);
    // console.log('fetchedMessage:', fetchedMessage);

    //   ------------------------------------
    //   fetch the active meetings
    //   ------------------------------------

    const { data, status } = useQuery(['actives', status], () =>
        fetchActiveMeetings()
    );
    // console.log('main value of status:', status);
    if (status === 'loading') {
        return <LoadingOverlay />;
    } else if (status === 'success') {
        // console.log('success test: isLoading: ', isLoading);
        if (isLoading) {
            // console.log('inside overlay: isLoading', isLoading);
            return <LoadingOverlay />;
        } else {
            //     dispatch(saveActiveMeetings(data.body.Items));
            //     return (
            //         <View style={styles.rootContainer}>
            //             <NextMeetingCard nextMeeting={activeMeetings[0]} />
            //             <Text style={styles.title}>Welcome!</Text>
            //             <MeetingsOutput meetings={activeMeetings} />
            //         </View>
            //     );
            // }
            // console.log('success - not Loading');
            if (activeMeetings.length === 0) {
                dispatch(saveActiveMeetings(data.body.Items));
            }
            // console.log('isLoading', isLoading);
            return (
                <View style={styles.rootContainer}>
                    <NextMeetingCard nextMeeting={activeMeetings[0]} />
                    <Text style={styles.title}>Welcome!</Text>
                    <MeetingsOutput meetings={activeMeetings} />
                </View>
            );
        }
    } else if (status === 'error') {
        console.log('ERROR getting active meetings');
        return (
            <View>
                <Text>Error getting active meetings</Text>
            </View>
        );
    } else {
        console.log('status: ', status);
        return (
            <View>
                <Text>else....</Text>
            </View>
        );
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
