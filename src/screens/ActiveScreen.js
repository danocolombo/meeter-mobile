// import axios from 'axios';
import { useEffect, useState, useContext } from 'react';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { MeetingsContext } from '../store/meeting-context';
import { GroupsContext } from '../store/groups-context';
import MeetingsOutput from '../components/Meeting/MeetingsOutput';
import { StyleSheet, Text, View } from 'react-native';
import NextMeetingCard from '../components/Meeting/NextMeetingCard';

function ActiveScreen() {
    const [isLoading, setIsLoading] = useState(false);
    const meetingsCtx = useContext(MeetingsContext);
    const groupsCtx = useContext(GroupsContext);
    const [theMeetngs, setTheMeetings] = useState();
    useEffect(() => {
        if (!theMeetngs) {
            setIsLoading(true);
            try {
                meetingsCtx.loadMeetings();
                groupsCtx.loadGroups();
            } catch (error) {
                Alert.alert(
                    'Authentication failed!',
                    'Could not log you in. Please check your credentials or try again later!'
                );
            }
            setIsLoading(false);
        }
    }, []);

    var d = new Date();
    d.setDate(d.getDate() - 1); // date - one
    const dminusone = d.toLocaleString(); //  M/DD/YYYY, H:MM:SS PM
    let datetime = dminusone.split(', '); // M/DD/YYYY
    const dateparts = datetime[0].split('/');
    const yr = dateparts[2];
    const mn = dateparts[0] < 10 ? '0' + dateparts[0] : dateparts[0];
    const da = dateparts[1];
    const target = yr + '-' + mn + '-' + da;
    const activeMeetings = meetingsCtx.meetings.filter(
        (mtg) => mtg.meetingDate > target
    );

    if (isLoading) {
        return <LoadingOverlay message='Fetching data...' />;
    }
    return (
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
