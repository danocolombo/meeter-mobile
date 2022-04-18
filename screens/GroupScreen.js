import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import GroupForm from '../components/Group/GroupForm';

function GroupScreen({ route }) {
    const group = route.params.group;
    const meetingId = route.params.meetingId;
    useEffect(() => {}, []);
    return (
        <>
            <View style={styles.rootContainer}>
                <GroupForm group={group} meetingId={meetingId} />
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
