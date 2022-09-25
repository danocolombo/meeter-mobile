import { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import { Colors } from '../../constants/colors';
import { useNavigation } from '@react-navigation/native';
import { getToday } from '../../util/helpers';
import { MeetingsContext } from '../../store/meeting-context';

function NextMeetingCard({ nextMeeting }) {
    const navigation = useNavigation();

    const [meetingToDisplay, setMeetingToDisplay] = useState(nextMeeting);

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
            {nextMeeting && (
                <Card
                    style={{
                        minWidth: '70%',
                        maxHeight: 130,
                        backgroundColor: Colors.primary500,
                        marginBottom: 20,
                        elevation: 5,
                    }}
                >
                    <Card.Title
                        titleStyle={{ color: 'white', fontWeight: 'bold' }}
                        title='Next Meeting'
                        subtitle={nextMeeting.meetingDate}
                        subtitleStyle={{ color: 'white', fontSize: 16 }}
                    />
                    <Card.Content>
                        <Text>{nextMeeting.meetingType}</Text>
                        <Text>{nextMeeting.title}</Text>
                    </Card.Content>
                </Card>
            )}
        </Pressable>
    );
}
export default NextMeetingCard;
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
