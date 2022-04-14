import { StyleSheet, Text, View } from 'react-native';
import MeetingForm from '../components/Meeting/MeetingForm';
import { Colors } from '../constants/colors';

function MeetingScreen() {
    return (
        <View style={styles.rootContainer}>
            <MeetingForm />
        </View>
    );
}
export default MeetingScreen;
const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        // backgroundColor: Colors.primary100,
    },
});
