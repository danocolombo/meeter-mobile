import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import GroupForm from '../components/Group/GroupForm';

function GroupScreen({ route }) {
    const groupId = route.params.groupId;
    const meetingId = route.params.meetingId;
    useEffect(() => {}, []);
    return (
        <>
            <View style={styles.rootContainer}>
                <GroupForm meetingId={meetingId} groupId={groupId} />
            </View>
        </>
    );
}
export default GroupScreen;
const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        // justifyContent: 'flex-start',
        alignItems: 'center',
    },
});
