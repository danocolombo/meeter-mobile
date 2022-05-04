import axios from 'axios';
import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../store/auth-context';
import { MeetingsContext } from '../store/meeting-context';

import LoadingOverlay from '../components/ui/LoadingOverlay';
import MeetingsOutput from '../components/Meeting/MeetingsOutput';

import NextMeetingCard from '../components/Meeting/NextMeetingCard';
import { StyleSheet, Text, View } from 'react-native';
import { GOOGLE_AUTH } from '@env';

function ActiveScreen() {
    const [isLoading, setIsLoading] = useState(false);
    const [activeMeetings, setActiveMeetings] = useState([]);
    const authCtx = useContext(AuthContext);
    const meetingsCtx = useContext(MeetingsContext);
    const token = authCtx.token;
    useEffect(() => {
        if (meetingsCtx.meetings) {
            setIsLoading(true);
            var d = new Date();
            d.setDate(d.getDate() - 1); // date - one
            const dminusone = d.toLocaleString(); //  M/DD/YYYY, H:MM:SS PM
            let datetime = dminusone.split(', '); // M/DD/YYYY
            const dateparts = datetime[0].split('/');
            const yr = dateparts[2];
            const mn = dateparts[0] < 10 ? '0' + dateparts[0] : dateparts[0];
            const da = dateparts[1] < 10 ? '0' + dateparts[1] : dateparts[1];
            const target = yr + '-' + mn + '-' + da;
            const theMeetings = meetingsCtx.meetings.filter(
                (mtg) => mtg.meetingDate > target
            );
            setActiveMeetings(theMeetings);
            setIsLoading(false);
        }
    }, [meetingsCtx.meetings]);
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
