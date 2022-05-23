import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import GroupForm from '../components/Group/GroupForm';

function GroupScreen({ route }) {
    const groupId = route.params.groupId;
    const grpCompKey = route.params.grpCompKey;
    useEffect(() => {}, []);
    return (
        <>
            <View style={styles.rootContainer}>
                <GroupForm groupId={groupId} grpCompKey={grpCompKey} />
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
