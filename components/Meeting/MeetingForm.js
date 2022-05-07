import React, { useState, useContext } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Alert,
    FlatList,
    Pressable,
    ScrollView,
    KeyboardAvoidingView,
} from 'react-native';
import { TextInput } from 'react-native-paper';
import MeetingTypeButtons from './MeetingTypeButtons';
import NumberInput from '../ui/NumberInput/NumberInput';
import { useNavigation } from '@react-navigation/native';
import { MeetingsContext } from '../../store/meeting-context';
import * as Crypto from 'expo-crypto';
import Button from '../ui/Button';
import GroupListItem from '../Group/GroupListItem';
import { isMeetingDateBeforeToday } from '../../util/date';
import { Colors } from '../../constants/colors';
import { GroupsContext } from '../../store/groups-context';
import { or } from 'react-native-reanimated';

function onDateChange() {}
function MeetingForm({ meetingId }) {
    const navHook = useNavigation();
    const meetingsCtx = useContext(MeetingsContext);

    const groupsCtx = useContext(GroupsContext);

    const groups = groupsCtx.groups;

    let theMeeting = {
        meetingDate: new Date().toISOString().slice(0, 10),
        meetingType: 'lesson',
        title: '',
        attendanceCount: 0,
        meal: '',
        mealCount: 0,
    };
    let foundMeeting;
    if (meetingId !== '0') {
        foundMeeting = meetingsCtx.activeMeetings.find(
            (mtg) => mtg.meetingId === meetingId
        );
        if (!foundMeeting) {
            foundMeeting = meetingsCtx.historicMeetings.find(
                (mtg) => mtg.meetingId === meetingId
            );
        }
        theMeeting = foundMeeting;
    }
    //=========================================
    // save a copy of original, in case they
    // change the date between active/historic
    //=========================================
    let originalMeeting = theMeeting;
    let theGroups = groups.filter((grp) => {
        if (grp.meetingId === meetingId) {
            return grp;
        }
    });
    function custom_sort(a, b) {
        return (
            // new Date(a.meetingDate).getTime() -
            // new Date(b.meetingDate).getTime()
            a.meetingType - b.meetingType
        );
    }
    let groupsFound = theGroups.sort(custom_sort);
    const [mMeetingId, setMMeetingId] = useState(meetingId);
    const [mDate, setMDate] = useState(theMeeting.meetingDate);
    const [mType, setMType] = useState(theMeeting.meetingType);
    const [mSpotlight, setMSpotlight] = useState(theMeeting.title);
    const [mSupportContact, setMSupportContact] = useState(
        theMeeting.supportContact
    );

    const [mAttendance, setMAttendance] = useState(theMeeting.attendanceCount);
    const [mMealCount, setMMealCount] = useState(theMeeting.mealCount);
    const [mMeal, setMMeal] = useState(theMeeting.meal);

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

        if (mMeetingId === '0') {
            async function getUni() {
                const digest = await Crypto.digestStringAsync(
                    Crypto.CryptoDigestAlgorithm.SHA256,
                    new Date().toString() + Math.random().toString()
                );
                return digest;
            }
            let uni = getUni()
                .then((result) => {
                    setMMeetingId(uni);
                    //todo ----- active or historic
                    activeCtx.addMeeting({
                        meetingId: mMeetingId,
                        meetingDate: mDate,
                        meetingType: mType,
                        title: mSpotlight,
                        attendanceCount: mAttendance,
                        meal: mMeal,
                        mealCount: mMealCount,
                    });
                    navHook.goBack();
                })
                .catch(() => console.log('error'));
        } else {
            if (isMeetingDateBeforeToday(originalMeeting.meetingDate)) {
                console.log('HISTORIC MEETING');
                meetingsCtx.updateHistoricMeeting(meetingId, {
                    meetingDate: mDate,
                    meetingType: mType,
                    title: mSpotlight,
                    attendanceCount: mAttendance,
                    meal: mMeal,
                    mealCount: mMealCount,
                });
            } else {
                meetingsCtx.updateActiveMeeting(meetingId, {
                    meetingDate: mDate,
                    meetingType: mType,
                    title: mSpotlight,
                    attendanceCount: mAttendance,
                    meal: mMeal,
                    mealCount: mMealCount,
                });
            }
            return;
            //updates need to made using the date.

            // activeCtx.updateMeeting(meetingId, {
            //     meetingDate: mDate,
            //     meetingType: mType,
            //     title: mSpotlight,
            //     attendanceCount: mAttendance,
            //     meal: mMeal,
            //     mealCount: mMealCount,
            // });

            navHook.goBack();
        }
    }
    function addGroupHandler() {
        navHook.navigate('Group', {
            meetingId: meetingId,
            group: '0',
        });
    }
    function renderGroupItem(itemData) {
        return <GroupListItem {...itemData.item} />;
    }
    return (
        <View style={styles.rootContainer}>
            <KeyboardAvoidingView>
                <View>
                    <View style={styles.meetingFrame}>
                        <View>
                            <TextInput
                                mode='outlined'
                                label='Meeting Date'
                                value={mDate}
                                onChangeText={changeDate}
                            />
                        </View>
                        <View>
                            <Text style={styles.label}>Meeting Type</Text>
                        </View>

                        <MeetingTypeButtons
                            currentType={mType}
                            onChange={setMType}
                        />

                        <View>
                            <TextInput
                                mode='outlined'
                                label={
                                    mType === 'Lesson'
                                        ? 'Lesson'
                                        : mType === 'Testimony'
                                        ? 'Guest'
                                        : 'Title'
                                }
                                value={mSpotlight}
                                onChangeText={setMSpotlight}
                            />
                        </View>
                        <View>
                            {mType === 'Lesson' ? (
                                <TextInput
                                    mode='outlined'
                                    label='Instructor'
                                    value={mSupportContact}
                                    onChangeText={changeSupport}
                                />
                            ) : null}
                        </View>
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'center',
                                marginVertical: 10,
                            }}
                        >
                            <View
                                style={{
                                    justifyContent: 'center',
                                    marginRight: 10,
                                }}
                            >
                                <Text style={{ fontSize: 16 }}>Attendance</Text>
                            </View>
                            <NumberInput
                                value={mAttendance}
                                onAction={setMAttendance}
                            />
                        </View>
                        <View>
                            <TextInput
                                mode='outlined'
                                label='Meal'
                                value={mMeal}
                                onChangeText={changeMeal}
                            />
                        </View>
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'center',
                                marginVertical: 10,
                            }}
                        >
                            <View
                                style={{
                                    justifyContent: 'center',
                                    marginRight: 10,
                                }}
                            >
                                <Text style={{ fontSize: 16 }}>
                                    Meals Served
                                </Text>
                            </View>
                            <NumberInput
                                value={mMealCount}
                                onAction={setMMealCount}
                            />
                        </View>
                        <View style={{ marginHorizontal: 10 }}>
                            <View style={styles.buttonContainer}>
                                <Button
                                    onPress={confirmMeetingHandler}
                                    customStyle={{ backgroundColor: 'green' }}
                                >
                                    SAVE
                                </Button>
                            </View>
                        </View>

                        <View style={styles.groupDividerRow}>
                            <Text style={styles.groupHeader}>Groups</Text>
                            <Pressable
                                onPress={addGroupHandler}
                                style={({ pressed }) => [
                                    {
                                        backgroundColor: pressed
                                            ? 'rgb(210, 230, 255)'
                                            : Colors.gray20,
                                    },
                                    styles.wrapperCustom,
                                ]}
                            >
                                {({ pressed }) => (
                                    <Text style={styles.text}>
                                        {pressed ? '+' : '+'}
                                    </Text>
                                )}
                            </Pressable>
                        </View>

                        <View style={styles.groupContainer}>
                            <FlatList
                                data={groupsFound}
                                renderItem={renderGroupItem}
                                keyExtractor={(group) => group.groupId}
                            />
                        </View>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </View>
    );
}

export default MeetingForm;

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        alignItems: 'center',
    },
    meetingFrame: {
        width: '100%',
        borderColor: Colors.primary800,
        marginTop: 5,
        borderWidth: 2,
        borderRadius: 5,
        borderColor: Colors.primary800,
        justifyContent: 'center',
        padding: 5,
    },
    comboRow: {
        flexDirection: 'column',
        marginBottom: 30,
    },
    comboRow2: {
        flexGrow: 1,
        flexDirection: 'row',
        display: 'flex',
        width: '80%',
        backgroundColor: Colors.gray10,
    },
    input: {
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
        // flex: 0.5,
    },
    mealMenu2: {
        flexGrow: 3,
        minWidth: '60%',
        marginRight: 5,
        height: '100%',
    },

    mealCount2: {
        minWidth: '30%',
    },
    groupDividerRow: {
        backgroundColor: Colors.gray20,
        flexDirection: 'row',
        borderTopWidth: 3,
        borderTopColor: 'black',
        borderBottomColor: 'black',
        borderBottomWidth: 3,
        marginVertical: 5,
    },
    groupDivider: {
        flexDirection: 'row',
        flexGrow: 1,
        backgroundColor: Colors.gray20,
        marginVertical: 15,
        width: '100%',
        justifyContent: 'center',
        alignContent: 'center',
        padding: 2,
    },
    groupHeader: {
        width: '90%',
        alignItems: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        paddingLeft: 10,
    },
    groupAddIcon: {
        width: '10%',
        textAlign: 'right',
        fontSize: 18,
        paddingRight: 20,
    },
    groupContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    buttonContainer: {
        width: '100%',
        marginVertical: 10,
        justifyContent: 'center',
        backgroundColor: 'green',
        borderColor: 'black',
        borderWidth: 2,
        borderRadius: 10,
    },
    wrapperCustom: {
        borderRadius: 8,
        padding: 6,
    },
});
