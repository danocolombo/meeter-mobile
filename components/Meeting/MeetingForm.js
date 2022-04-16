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
function MeetingForm({ meetingId, route, navigation }) {
    const activeCtx = useContext(MeetingsContext);
    const historicCtx = useContext(HistoricContext);
    const meetings = activeCtx.meetings;
    const historics = historicCtx.meetings;

    let theMeeting = {
        meetingDate: new Date().toISOString().slice(0, 10),
        meetingType: '',
        title: '',
        attendanceCount: 0,
        meal: '',
        mealCount: 0,
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
    const [mSupportContact, setMSupportContact] = useState(
        theMeeting.supportContact
    );
    const [mAttendance, setMAttendance] = useState(
        theMeeting.attendanceCount.toString()
    );
    const [mMealCount, setMMealCount] = useState(
        theMeeting.mealCount.toString()
    );
    const [mMeal, setMMeal] = useState(theMeeting.meal);

    function changeDate(val) {
        setMDate(val);
    }
    function changeType(val) {
        setMType(val);
    }
    function changeSupport(val) {
        setMSupportContact(val);
    }
    function changeSpotlight(val) {
        setMSpotlight(val);
    }
    function changeAttendance(val) {
        setMAttendance(val);
    }
    function onTypeSelection(itemValue) {
        setMType(itemValue);
    }
    function changeMeal(itemValue) {
        setMMeal(itemValue);
    }
    function changeMealCount(itemValue) {
        setMMealCount(itemValue);
    }
    function confirmMeetingHandler(navigation) {
        if (
            isNaN(Date.parse(mDate)) ||
            mType.length < 3 ||
            mSpotlight.length < 3 ||
            parseInt(mAttendance) < 0 ||
            parseInt(mAttendance) > 300
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
            //determine if it is active or historical
            if (dateIsBeforeToday(mDate)) {
                historicCtx.updateMeeting(meetingId, {
                    meetingDate: mDate,
                    meetingType: mType,
                    title: mSpotlight,
                    attendanceCount: mAttendance,
                    meal: mMeal,
                    mealCount: mMealCount,
                });
                console.log('update historical meeting');
            } else {
                activeCtx.updateMeeting(meetingId, {
                    meetingDate: mDate,
                    meetingType: mType,
                    title: mSpotlight,
                    attendanceCount: mAttendance,
                    meal: mMeal,
                    mealCount: mMealCount,
                });
                console.log('update active meeting');
            }
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
                label={
                    mType === 'Lesson'
                        ? 'Lesson'
                        : mType === 'Testimony'
                        ? 'Guest'
                        : 'Title'
                }
                value={mSpotlight}
                onUpdateValue={changeSpotlight}
            />
            {mType === 'Lesson' ? (
                <Input
                    label='Instructor'
                    value={mSupportContact}
                    onUpdateValue={changeSupport}
                />
            ) : null}
            <InputNumber
                label='Attendance'
                keyboardType='decimal-pad'
                value={mAttendance}
                onUpdateValue={changeAttendance}
            />
            <Input label='Meal' value={mMeal} onUpdateValue={changeMeal} />
            <InputNumber
                label='Meal Count'
                keyboardType='decimal-pad'
                value={mMealCount}
                onUpdateValue={changeMealCount}
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
        marginTop: 5,
        borderWidth: 1,
        borderRadius: 5,
        paddingLeft: 15,
        paddingRight: 25,
        paddingBottom: 10,
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
