import { useState } from 'react';
import { Text, TextInput, View } from 'react-native';

function Date() {
    const [meetingDate, setMeetingDate] = useState();
    function onChangeHandler(date) {
        setMeetingDate(date);
    }
    return (
        <View>
            <Text>Date:</Text>
            <TextInput name='date' value={meetingDate} />
        </View>
    );
}
