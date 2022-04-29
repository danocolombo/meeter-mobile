import { StyleSheet, Text, View } from 'react-native';
import UserList from './UserList';

function UsersOutput(users) {
    return (
        <View style={styles.rootContainer}>
            <UserList users={users} />
        </View>
    );
}
export default UsersOutput;
const styles = StyleSheet.create({
    rootContainer: {
        width: '80%',
    },
});
