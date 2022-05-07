import axios from 'axios';
import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../store/auth-context';
import { MeetingsContext } from '../store/meeting-context';
import { StyleSheet, Text, View } from 'react-native';
import MeetingsOutput from '../components/Meeting/MeetingsOutput';

function HistoricScreen() {
    const [fetchedMessage, setFetchedMessage] = useState();
    const [historicMeetings, setHistoricMeetings] = useState();
    const authCtx = useContext(AuthContext);
    const meetingsCtx = useContext(MeetingsContext);
    const token = authCtx.token;
    //get today's date
    var d = new Date();
    d.setDate(d.getDate() - 0); // we don't want to adjust the date
    const dminusone = d.toLocaleString(); //  M/DD/YYYY, H:MM:SS PM
    let datetime = dminusone.split(', '); // M/DD/YYYY
    const dateparts = datetime[0].split('/');
    const yr = dateparts[2];
    const mn = dateparts[0] < 10 ? '0' + dateparts[0] : dateparts[0];
    const da = dateparts[1] < 10 ? '0' + dateparts[1] : dateparts[1];
    const today = yr + '-' + mn + '-' + da;
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
        if (meetingsCtx.historicMeetings) {
            setHistoricMeetings(meetingsCtx.historicMeetings);
        }
    }, []);
    return (
        <View style={styles.rootContainer}>
            <Text style={styles.title}>Welcome!</Text>
            <MeetingsOutput meetings={historicMeetings} />
        </View>
    );
}

export default HistoricScreen;

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        alignItems: 'center',
        padding: 32,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 8,
    },
});
