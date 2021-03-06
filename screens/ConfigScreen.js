import axios from 'axios';
import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../store/auth-context';
import { StyleSheet, Text, View } from 'react-native';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import MeetingCard from '../components/Meeting/MeetingCard';

function ConfigScreen(navigation) {
    // const routeName = getFocusedRouteNameFromRoute();
    console.log('===========\n', navigation, '\n===========');
    const [fetchedMessage, setFetchedMessage] = useState();
    const authCtx = useContext(AuthContext);
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
    return (
        <View style={styles.rootContainer}>
            <MeetingCard />
            <Text style={styles.title}>Welcome!</Text>
            <Text>You authenticated successfully!</Text>
            <Text>{fetchedMessage}</Text>
        </View>
    );
}

export default ConfigScreen;

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
