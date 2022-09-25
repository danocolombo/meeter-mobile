import { StyleSheet, View } from 'react-native';
import GroupList from './GroupList';

function GroupsOutput(groups) {
    return (
        <View style={styles.userCard}>
            <GroupList groups={groups} />
        </View>
    );
}
export default GroupsOutput;
const styles = StyleSheet.create({
    userCard: {
        width: '90%',
    },
});
