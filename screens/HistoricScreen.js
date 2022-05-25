import axios from 'axios';
import { useEffect, useState, useContext } from 'react';
import { useQuery } from 'react-query';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { AuthContext } from '../store/auth-context';
import { MeetingsContext } from '../store/meeting-context';
import { StyleSheet, Text, View } from 'react-native';
import MeetingsOutput from '../components/Meeting/MeetingsOutput';
import { fetchHistoricMeetings } from '../providers/meetings';
import { loadHistoricMeetings } from '../features/meetings/meetingsSlice';
import { printObject } from '../util/helpers';
function HistoricScreen() {
    const [fetchedMessage, setFetchedMessage] = useState();
    const [historicMeetings, setHistoricMeetings] = useState();
    const dispatch = useDispatch();
    const { data, status } = useQuery(
        ['historic', status],
        fetchHistoricMeetings
    );
    if (status === 'loading') {
        return <LoadingOverlay />;
    } else if (status === 'error') {
        console.log('ERROR getting historic meetings');
    } else {
        dispatch(loadHistoricMeetings(data));
        return (
            <View style={styles.rootContainer}>
                <Text style={styles.title}>Welcome???</Text>
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
