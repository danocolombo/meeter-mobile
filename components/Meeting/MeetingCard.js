import { StyleSheet, Text, View } from 'react-native';
import { Colors } from '../../constants/colors';

function MeetingCard() {
    return (
        <View style={styles.form}>
            <Text style={styles.title}>Next Meeting</Text>
            <Text style={styles.date}>4/11/2022</Text>
            <Text style={styles.type}>Testimony</Text>
            <Text style={styles.spotlight}>Juan</Text>
        </View>
    );
}
export default MeetingCard;
const styles = StyleSheet.create({
    form: {
        backgroundColor: Colors.primary400,
        borderWidth: 2,
        borderColor: Colors.primary700,
        borderRadius: 8,
        width: '80%',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 24,
        color: 'white',
        // marginTop: 8,
    },
    date: {
        color: Colors.primary800,
        fontSize: 20,
        margin: 10,
    },
    type: {
        fontWeight: 'bold',
        fontSize: 18,
    },
    spotlight: {
        fontWeight: 'bold',
        fontSize: 18,
    },
});
