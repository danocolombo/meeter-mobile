import { StyleSheet, View } from 'react-native';
import UserList from './UserList';

function UsersOutput(users) {
    return (
        <View style={styles.userCard}>
            <UserList users={users} />
        </View>
    );
}
export default UsersOutput;
const styles = StyleSheet.create({
    userCard: {
        width: '90%',
    },
});
