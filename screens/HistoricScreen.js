import axios from 'axios';
import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../store/auth-context';
import { HistoricContext } from '../store/historic-context';
import { MeetingsContext } from '../store/meeting-context';
import { StyleSheet, Text, View } from 'react-native';
import MeetingCard from '../components/Meeting/MeetingCard';
import MeetingsOutput from '../components/Meeting/MeetingsOutput';

function HistoricScreen() {
    const [fetchedMessage, setFetchedMessage] = useState();
    const authCtx = useContext(AuthContext);
    const [meetingList, setMeetingList] = useState();
    // const historicCtx = useContext(HistoricContext);
    const meetingsCtx = useContext(MeetingsContext);
    const token = authCtx.token;

    var d = new Date();
    d.setDate(d.getDate() - 1); // date - one
    const dminusone = d.toLocaleString(); //  M/DD/YYYY, H:MM:SS PM
    let datetime = dminusone.split(', '); // M/DD/YYYY
    const dateparts = datetime[0].split('/');
    const yr = dateparts[2];
    const mn = dateparts[0] < 10 ? '0' + dateparts[0] : dateparts[0];
    const da = dateparts[1];
    const target = yr + '-' + mn + '-' + da;
    useEffect(() => {
        axios
            .get(
                'https://react-native-max-2022-default-rtdb.firebaseio.com/message.json?auth=' +
                    token
            )
            .then((response) => {
                setFetchedMessage(response.data);
            });
    }, [token]);
    useEffect(() => {
        let meetingData = meetingsCtx.meetings.filter(
            (mtg) => mtg.meetingDate < target
        );
        function custom_sort(a, b) {
            return (
                new Date(b.meetingDate).getTime() -
                new Date(a.meetingDate).getTime()
            );
        }
        let newSort = meetingData.sort(custom_sort);
        setMeetingList(newSort);
    }, []);
    return (
        <View style={styles.rootContainer}>
            <MeetingCard />
            <Text style={styles.title}>Welcome!</Text>
            {/* <MeetingsOutput
                meetings={meetingsCtx.meetings.filter(
                    (mtg) => mtg.meetingDate < target
                )}
            /> */}
            <MeetingsOutput meetings={meetingList} />
        </View>
    );
}

export default HistoricScreen;

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
