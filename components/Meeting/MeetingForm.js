import { useState, useContext } from 'react';
import { StyleSheet, View, Text, Alert } from 'react-native';
import { MeetingsContext } from '../../store/meeting-context';
import { HistoricContext } from '../../store/historic-context';
import Button from '../ui/Button';
import { Colors } from '../../constants/colors';
import Input from '../ui/Input';
import InputNumber from '../ui/InputNumber';

function onDateChange() {}
function MeetingForm({ meetingId }) {
    const activeCtx = useContext(MeetingsContext);
    const historicCtx = useContext(HistoricContext);
    const meetings = activeCtx.meetings;
    const historics = historicCtx.meetings;
    let theMeeting = {
        meetingDate: new Date().toISOString().slice(0, 10),
        meetingType: '',
        title: '',
        attendanceCount: 0,
    };
    if (meetingId !== '0') {
        theMeeting = meetings.find((mtg) => mtg.meetingId === meetingId);
        if (!theMeeting) {
            theMeeting = historics.find((mtg) => mtg.meetingId === meetingId);
        }
    }
    const [mDate, setMDate] = useState(theMeeting.meetingDate);
    const [mType, setMType] = useState(theMeeting.meetingType);
    const [mSpotlight, setMSpotlight] = useState(theMeeting.title);
    const [mAttendane, setMAttendance] = useState(
        theMeeting.attendanceCount.toString()
    );

    function changeDate(val) {
        setMDate(val);
    }
    function changeType(val) {
        setMType(val);
    }
    function changeSpotlight(val) {
        setMSpotlight(val);
    }
    function changeAttendance(val) {
        setMAttendance(val);
    }
    function saveMeetingHandler() {
        // check if mDate is a date

        // mType,, mSpotlight can't be null

        // mAttendance has to be number 0-150
        Alert;
        Alert.alert('SAVE attempt');
    }
    return (
        <View style={styles.rootContainer}>
            <Input
                label='Meeting Date'
                value={mDate}
                onUpdateValue={changeDate}
            />
            <Input label='Type' value={mType} onUpdateValue={changeType} />
            <Input
                label='Spotlight'
                value={mSpotlight}
                onUpdateValue={changeSpotlight}
            />
            <InputNumber
                label='Attendance'
                keyboardType='decimal-pad'
                value={mAttendane}
                onUpdateValue={changeAttendance}
            />
            <View>
                <Button onPress={saveMeetingHandler}>SAVE</Button>
            </View>
        </View>
    );
}

export default MeetingForm;

const styles = StyleSheet.create({
    rootContainer: {
        // flex: 1,
        flexDirection: 'column',
        width: '95%',
        marginTop: 10,
        borderWidth: 1,
        borderRadius: 5,
        padding: 5,
        borderColor: Colors.primary800,
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'black',
    },
    buttons: {
        marginTop: 12,
    },
});
