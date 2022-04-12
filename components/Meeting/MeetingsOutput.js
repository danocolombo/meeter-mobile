import { StyleSheet, Text, View } from 'react-native';
import MeetingList from './MeetingList';

function MeetingsOutput(meetings) {
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
