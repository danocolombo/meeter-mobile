import axios from 'axios';
import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../store/auth-context';
import { MeetingsContext } from '../store/meeting-context';
import MeetingsOutput from '../components/Meeting/MeetingsOutput';
import { StyleSheet, Text, View } from 'react-native';
import MeetingCard from '../components/Meeting/MeetingCard';
import { GOOGLE_AUTH } from '@env';

function ActiveScreen() {
    const [fetchedMessage, setFetchedMessage] = useState();
    const [activeMeetings, setActiveMeetings] = useState();
    const authCtx = useContext(AuthContext);
    const meetingsCtx = useContext(MeetingsContext);
    const token = authCtx.token;
    // meetingsCtx.loadMeetings();
    //-------------------
    // get env variables
    //-------------------
    var d = new Date();
    d.setDate(d.getDate() - 1); // date - one
    const dminusone = d.toLocaleString(); //  M/DD/YYYY, H:MM:SS PM
    let datetime = dminusone.split(', '); // M/DD/YYYY
    const dateparts = datetime[0].split('/');
    const yr = dateparts[2];
    const mn = dateparts[0] < 10 ? '0' + dateparts[0] : dataparts[0];
    const da = dateparts[1];
    const target = yr + '-' + mn + '-' + da;
    useEffect(() => {
        axios
            .get(`${GOOGLE_AUTH}/message.json?auth=` + token)
            .then((response) => {
                setFetchedMessage(response.data);
            });
    }, [token]);
    return (
        <View style={styles.rootContainer}>
            <MeetingCard />
            <Text style={styles.title}>Welcome!</Text>
            <MeetingsOutput
                meetings={meetingsCtx.meetings.filter(
                    (mtg) => mtg.meetingDate > target
                )}
            />
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
