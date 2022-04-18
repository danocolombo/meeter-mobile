import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MeetingForm from '../components/Meeting/MeetingForm';

function MeetingScreen({ route, navigation }) {
    const meetingId = route.params.meetingId;
    useEffect(() => {}, []);
    return (
        <>
            <View style={styles.rootContainer}>
                <MeetingForm meetingId={meetingId} navigation />
            </View>
        </>
    );
}
export default MeetingScreen;
const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        // justifyContent: 'flex-start',
        alignItems: 'center',
    },
});
