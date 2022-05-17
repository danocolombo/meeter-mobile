import { StyleSheet, Text, View } from 'react-native';
import { useEffect } from 'react';
// import { useSelector } from 'react-redux';
import MeetingList from './MeetingList';

function MeetingsOutput(meetings) {
    // const meetings = useSelector((state) => state.activeMeetings);

    return (
        <View style={styles.rootContainer}>
            <MeetingList meetings={meetings} />
        </View>
    );
}
export default MeetingsOutput;
const styles = StyleSheet.create({
    rootContainer: {
        width: '80%',
    },
});
