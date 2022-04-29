import { StyleSheet, Text, View, Pressable } from 'react-native';
import { Colors } from '../../../constants/colors';
import { useNavigation } from '@react-navigation/native';

function UserCard({ user }) {
    const navigation = useNavigation();

    function userPressHandler() {
        navigation.navigate('User', {
            userId: user.userId,
        });
    }
    return (
        <View style={styles.cardContainer}>
            <Pressable
                onPress={userPressHandler}
                style={({ pressed }) => pressed && styles.pressed}
            >
                <View style={styles.form}>
                    <Text style={styles.title}>{user.firstName}</Text>
                    <Text style={styles.text}>{user.lastName}</Text>
                </View>
            </Pressable>
        </View>
    );
}
export default UserCard;
const styles = StyleSheet.create({
    cardContainer: {
        width: '45%',
        margin: 5,
    },
    form: {
        backgroundColor: Colors.primary400,
        borderWidth: 2,
        borderColor: Colors.primary700,
        borderRadius: 8,
        // width: '80%',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 24,
        color: 'white',
        // marginTop: 8,
    },
    text: {
        color: 'white',
        fontSize: 18,
    },
    pressed: {
        opacity: 0.75,
    },
});
