import { useState, useContext } from 'react';
import { StyleSheet, View, Text, Alert } from 'react-native';
import { MeetingsContext } from '../../store/meeting-context';
import { HistoricContext } from '../../store/historic-context';
import * as Crypto from 'expo-crypto';
import Button from '../ui/Button';
import { Colors } from '../../constants/colors';
import Input from '../ui/Input';
import InputNumber from '../ui/InputNumber';
import { dateIsBeforeToday, getUniqueId } from '../../util/helpers';

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
    function confirmMeetingHandler() {
        //check each value
        //-------------------------
        // date
        //-------------------------
        if (
            isNaN(Date.parse(mDate)) ||
            mType.length < 3 ||
            mSpotlight.length < 3 ||
            parseInt(mAttendane) < 0 ||
            parseInt(mAttendane) > 300
        ) {
            Alert.alert('Validation Error', 'Check your values', [
                { text: 'OK', style: 'destruction' },
            ]);
            return;
        }
        if (dateIsBeforeToday(mDate)) {
            console.log('HISTORIC');
        } else {
            console.log('Active');
        }
        if (meetingId === '0') {
            async function getUni() {
                const digest = await Crypto.digestStringAsync(
                    Crypto.CryptoDigestAlgorithm.SHA256,
                    new Date().toString() + Math.random().toString()
                );
                return digest;
            }
            let uni = getUni()
                .then((result) => {
                    console.log('uniuni:', result);
                    Alert.alert('SAVE attempt');
                })
                .catch(() => console.log('error'));
        } else {
            Alert.alert('UPDATE attempt');
        }
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
                <Button onPress={confirmMeetingHandler}>SAVE</Button>
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
