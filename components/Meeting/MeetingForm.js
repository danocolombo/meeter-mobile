import { useState, useContext } from 'react';
import { StyleSheet, View, Text, Alert } from 'react-native';
//import SelectDropdown from 'react-native-select-dropdown';
import SelectDropdown from '../ui/DropDown/SelectDropdown';
//import DropDownPicker from 'react-native-dropdown-picker';
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
    const meetingTypes = ['Lesson', 'Testimony', 'Special', 'Training'];
    //   --------METHODS  ------------
    //   =============================
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
            <View style={styles.flexRow}>
                <Input
                    label='Meeting Date'
                    value={mDate}
                    onUpdateValue={changeDate}
                />
            </View>
            <View style={styles.flexRow}>
                <Text style={styles.label}>Meeting Type</Text>
            </View>
            <View style={styles.flexRow}>
                <SelectDropdown
                    data={meetingTypes}
                    onSelect={(selectedItem, index) => {
                        // console.log(selectedItem, index);
                        setMType(selectedItem);
                    }}
                    defaultValue={mType}
                    buttonStyle={{
                        borderColor: Colors.accent500,
                        borderWidth: 1,
                        borderRadius: 2,
                    }}
                    buttonTextAfterSelection={(selectedItem, index) => {
                        // text represented after item is selected
                        // if data array is an array of objects then return selectedItem.property to render after item is selected
                        return selectedItem;
                    }}
                    rowTextForSelection={(item, index) => {
                        // text represented for each item in dropdown
                        // if data array is an array of objects then return item.property to represent item in dropdown
                        return item;
                    }}
                />
            </View>
            <View style={styles.flexRow}>
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
                    style={styles.input}
                />
            </View>
            <View style={styles.flexRow}>
                {mType === 'Lesson' ? (
                    <Input
                        label='Instructor'
                        value={mSupportContact}
                        onUpdateValue={changeSupport}
                        style={styles.input}
                    />
                ) : null}
            </View>
            <View style={styles.flexRow}>
                <InputNumber
                    label='Attendance'
                    keyboardType='decimal-pad'
                    value={mAttendance}
                    onUpdateValue={changeAttendance}
                />
            </View>
            <View style={styles.flexRow}>
                <View style={styles.mealMenu}>
                    <Input
                        label='Meal'
                        value={mMeal}
                        onUpdateValue={changeMeal}
                        // style={styles.input}
                    />
                </View>
                <View style={styles.mealCount}>
                    <InputNumber
                        label='Meal Count'
                        keyboardType='decimal-pad'
                        value={mMealCount}
                        onUpdateValue={changeMealCount}
                    />
                </View>
            </View>
            <View style={styles.flexRow}>
                <View style={styles.buttonContainer}>
                    <Button onPress={confirmMeetingHandler}>SAVE</Button>
                </View>
            </View>
        </View>
    );
}

export default MeetingForm;

const styles = StyleSheet.create({
    rootContainer: {
        // display: flex,
        flexDirection: 'column',
        flexWrap: 'wrap',
        width: '95%',
        borderColor: Colors.primary800,
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
    flexRow: {
        flexGrow: 1,
        flexDirection: 'row',
        display: 'flex',
        width: '80%',
    },
    input: {
        // height: '100%',
        minWidth: '60%',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'black',
    },
    buttons: {
        marginTop: 12,
    },
    label: {
        fontSize: 20,
        marginBottom: 2,
    },
    spotlight: {
        width: '90%',
    },
    mealMenu: {
        flexGrow: 3,
        minWidth: '70%',
        marginRight: 5,
        height: '100%',
    },
    mealCount: {
        minWidth: '30%',
    },
    buttonContainer: {
        // flexDirection: 'row',
        // flexGrow: 1,
        width: '100%',
        marginTop: 10,
        justifyContent: 'center',
        // alignItems: 'center',
    },
});
