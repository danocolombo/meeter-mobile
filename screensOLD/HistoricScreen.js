import axios from 'axios';
import { useEffect, useState, useContext } from 'react';
import { useQuery } from 'react-query';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { AuthContext } from '../store/auth-context';
import { MeetingsContext } from '../store/meeting-context';
import { StyleSheet, Text, View } from 'react-native';
import MeetingsOutput from '../components/Meeting/MeetingsOutput';
import { fetchHistoricMeetings } from '../providers/meetings';
function HistoricScreen() {
    const [fetchedMessage, setFetchedMessage] = useState();
    const [historicMeetings, setHistoricMeetings] = useState();
    const authCtx = useContext(AuthContext);
    const meetingsCtx = useContext(MeetingsContext);
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
    //   ---------------------------------------------
    //   fetch the historic meetings
    //   ---------------------------------------------
    const { data, status } = useQuery(
        ['historic', status],
        fetchHistoricMeetings
    );
    if (status === 'loading') {
        return <LoadingOverlay />;
    } else if (status === 'error') {
        console.log('ERROR getting historic meetings');
    } else {
        meetingsCtx.historicMeetings = data;

        return (
            <View style={styles.rootContainer}>
                <Text style={styles.title}>Welcome!</Text>
                <MeetingsOutput meetings={data} />
            </View>
        );
    }

    //return <LoadingOverlay />;
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
