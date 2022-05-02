import axios from 'axios';
import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../store/auth-context';
import { MeeterContext } from '../store/meeter-context';
import { StyleSheet, Text, View } from 'react-native';

function ConfigMeetingsScreen() {
    const [isLoading, setIsLoading] = useState(false);
    const [fetchedMessage, setFetchedMessage] = useState();
    const authCtx = useContext(AuthContext);
    const token = authCtx.token;

    return (
        <View style={styles.rootContainer}>
            <Text style={styles.title}>SYSTEM CONFIGS</Text>
        </View>
    );
}

export default ConfigMeetingsScreen;

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
