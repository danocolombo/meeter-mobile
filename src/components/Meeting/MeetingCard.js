import { useContext } from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { Colors } from '../../constants/colors';
import { useNavigation } from '@react-navigation/native';

import { MeetingsContext } from '../../store/meeting-context';

function MeetingCard() {
    const navigation = useNavigation();

    const meetingsCtx = useContext(MeetingsContext);
    const nextMeeting = meetingsCtx.meetings[0];
    function meetingPressHandler() {
        navigation.navigate('Meeting', {
            meetingId: nextMeeting.meetingId,
        });
    }
    return (
        <Pressable
            onPress={meetingPressHandler}
            style={({ pressed }) => pressed && styles.pressed}
        >
            <View style={styles.form}>
                <Text style={styles.title}>Next Meeting</Text>
                <Text style={styles.date}>{nextMeeting.meetingDate}</Text>
                <Text style={styles.type}>{nextMeeting.meetingType}</Text>
                <Text style={styles.spotlight}>{nextMeeting.title}</Text>
            </View>
        </Pressable>
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
    pressed: {
        opacity: 0.75,
    },
});
