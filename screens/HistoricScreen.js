import axios from 'axios';
import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../store/auth-context';
import { HistoricContext } from '../store/historic-context';
import { StyleSheet, Text, View } from 'react-native';
import MeetingCard from '../components/Meeting/MeetingCard';
import MeetingsOutput from '../components/Meeting/MeetingsOutput';

function HistoricScreen() {
    const [fetchedMessage, setFetchedMessage] = useState();
    const authCtx = useContext(AuthContext);
    const historicCtx = useContext(HistoricContext);
    const token = authCtx.token;
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
    return (
        <View style={styles.rootContainer}>
            <MeetingCard />
            <Text style={styles.title}>Welcome!</Text>
            <MeetingsOutput meetings={historicCtx.meetings} />
            {/* <Text>You authenticated successfully!</Text>
            <Text>{fetchedMessage}</Text> */}
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
