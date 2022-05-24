import React, { useState, useEffect, useContext } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Alert,
    FlatList,
    Pressable,
    ScrollView,
    KeyboardAvoidingView,
    LogBox,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useQuery } from 'react-query';
import { TextInput } from 'react-native-paper';
import MeetingTypeButtons from './MeetingTypeButtons';
import NumberInput from '../ui/NumberInput/NumberInput';
import { useNavigation } from '@react-navigation/native';
// import { MeetingsContext } from '../../store/meeting-context';
import * as Crypto from 'expo-crypto';
import Button from '../ui/Button';
import GroupsForMeetingForm from '../Group/GroupsForMeetingForm';
import GroupListItem from '../Group/GroupListItem';
import { isMeetingDateBeforeToday } from '../../util/date';
import { Colors } from '../../constants/colors';
import { getToday, getUniqueId, printObject } from '../../util/helpers';
import { addMeeting } from '../../providers/meetings';
import { fetchGroupsForMeeting, deleteGroup } from '../../providers/groups';
import {
    addActiveMeeting,
    getActiveMeeting,
} from '../../features/meetings/meetingsSlice';
import {
    clearGroups,
    loadGroups,
    removeGroup,
} from '../../features/groups/groupsSlice';
// import { GroupsContext } from '../../store/groups-context';
// import { or } from 'react-native-reanimated';

function MeetingForm({ meetingId }) {
    const navHook = useNavigation();
    const dispatch = useDispatch();
    const client = useSelector((state) => state.user.activeClient);
    const activeMeetings = useSelector(
        (state) => state.meetings.activeMeetings
    );
    const groups = useSelector((state) => state.groups.meetingGroups);
    const [mtgCompKey, setMtgCompKey] = useState('');
    const [grpCompKey, setGrpCompKey] = useState('');
    const [meeting, setMeeting] = useState('');
    const [meetingCopy, setMeetingCopy] = useState('');
    const [mMeetingId, setMMeetingId] = useState('');
    const [mDate, setMDate] = useState('');
    const [mType, setMType] = useState('');
    const [mSpotlight, setMSpotlight] = useState('');
    const [mSupportContact, setMSupportContact] = useState('');

    const [mAttendance, setMAttendance] = useState(0);
    const [mMealCount, setMMealCount] = useState(0);
    const [mMeal, setMMeal] = useState('');
    useEffect(() => {
        // LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
        // /dispatch(clearGroups, null);
        if (meetingId === '0') {
            // getToday, only once, use twice
            let today = getToday();
            setMeeting({
                meetingDate: today,
                meetingType: 'lesson',
                title: '',
                attendanceCount: 0,
                meal: '',
                mealCount: 0,
            });
            setMMeetingId('0');
            setMDate(today);
            setMType('lesson');
            setMSpotlight('');
            setMSupportContact('');
            setMAttendance(0);
            setMMealCount(0);
            setMMeal('');
        } else {
            //   --------------------------------------
            //todo need to get the meeting from redux
            //   --------------------------------------
            const foundMeeting = activeMeetings.find(
                (mtg) => mtg.meetingId === meetingId
            );
            setMeeting(foundMeeting);
            setMeetingCopy(foundMeeting); // in case they change date
            // load field values
            setMMeetingId(foundMeeting.meetingId);
            setMDate(foundMeeting.meetingDate);
            setMType(foundMeeting.meetingType);
            setMSpotlight(foundMeeting.title);
            setMSupportContact(foundMeeting.supporContact);
            setMAttendance(foundMeeting.attendanceCount);
            setMMealCount(foundMeeting.mealCount);
            setMMeal(foundMeeting.meal);

            //----------------------------------
            // need to get groups from db
            // for this meeting by grpCompKey
            //----------------------------------
            setMtgCompKey(client + '#' + foundMeeting.meetingId);
            //setGrpCompKey(client + )
            let grpCompKey = client + '#' + foundMeeting.meetingId;
            setGrpCompKey(grpCompKey);
            async function fetchdbGroupsForMeeting(grpCompKey) {
                return fetchGroupsForMeeting(grpCompKey);
            }
            fetchdbGroupsForMeeting(grpCompKey).then((results) => {
                // console.log('okay now save locally');
                if (results) {
                    //printObject('results', results);
                    dispatch(loadGroups(results));
                }
            });
        }
    }, []);

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
    function onDateChange() {}
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
            let uni = getUniqueId()
                .then((result) => {
                    //it = result;
                    // console.log('meetingId', result);
                    // console.log('meetingDate', mDate);
                    // console.log('meetingType', mType);
                    // console.log('title', mSpotlight);
                    // console.log('attendanceCount', mAttendance);
                    // console.log('meal', mMeal);
                    // console.log('mealCount', mMealCount);
                    let mtgCompKey =
                        client +
                        '#' +
                        mDate.substring(0, 4) +
                        '#' +
                        mDate.substring(5, 7) +
                        '#' +
                        mDate.substring(8, 10);
                    let newMeeting = {
                        clientId: 'wbc',
                        mtgCompKey: mtgCompKey,
                        meetingId: result,
                        meetingDate: mDate,
                        meetingType: mType,
                        title: mSpotlight,
                        attendanceCount: mAttendance,
                        meal: mMeal,
                        mealCount: mMealCount,
                    };

                    let dbUpdateResults = async () => {
                        // deleteActiveMeeting(meetingId);
                        addMeeting(newMeeting);
                    };
                    dbUpdateResults().then((results) => {
                        // console.log('okay now save locally');
                        dispatch(addActiveMeeting(newMeeting));
                        navHook.goBack();
                    });
                })
                .catch((err) => console.log('new meeting save error\n', err));
        } else {
            Alert.alert(
                'Meeting Update Error',
                'We have not implemented updating [MF0522]',
                [{ text: 'OK', style: 'destruction' }]
            );
            return;
        }
        // getUniqueId().then((newId) => console.log('what?:', newId));
        // setMMeetingId(getUniqueId());
        // console.log('meetingId(it)', it);
        // console.log('meetingId', result);
        // console.log('meetingDate', mDate);
        // console.log('meetingType', mType);
        // console.log('title', mSpotlight);
        // console.log('attendanceCount', mAttendance);
        // console.log('meal', mMeal);
        // console.log('mealCount', mMealCount);

        //             setMMeetingId(uni);
        //             //todo ----- active or historic
        //             activeCtx.addMeeting({
        //                 meetingId: mMeetingId,
        //                 meetingDate: mDate,
        //                 meetingType: mType,
        //                 title: mSpotlight,
        //                 attendanceCount: mAttendance,
        //                 meal: mMeal,
        //                 mealCount: mMealCount,
        //             });
        //             navHook.goBack();
        //         })
        //         .catch(() => console.log('error'));
        // } else {
        //     if (isMeetingDateBeforeToday(originalMeeting.meetingDate)) {
        //         console.log('HISTORIC MEETING');
        //         meetingsCtx.updateHistoricMeeting(meetingId, {
        //             meetingDate: mDate,
        //             meetingType: mType,
        //             title: mSpotlight,
        //             attendanceCount: mAttendance,
        //             meal: mMeal,
        //             mealCount: mMealCount,
        //         });
        //     } else {
        //         meetingsCtx.updateActiveMeeting(meetingId, {
        //             meetingDate: mDate,
        //             meetingType: mType,
        //             title: mSpotlight,
        //             attendanceCount: mAttendance,
        //             meal: mMeal,
        //             mealCount: mMealCount,
        //         });
        //     }
        //     return;
        //     //updates need to made using the date.

        //     // activeCtx.updateMeeting(meetingId, {
        //     //     meetingDate: mDate,
        //     //     meetingType: mType,
        //     //     title: mSpotlight,
        //     //     attendanceCount: mAttendance,
        //     //     meal: mMeal,
        //     //     mealCount: mMealCount,
        //     // });

        //     navHook.goBack();
        // }
    }
    function addGroupHandler() {
        navHook.navigate('Group', {
            groupId: '0',
            meetingInfo: {
                meetingDate: mDate,
                mtgCompKey: mtgCompKey,
                meetingId: mMeetingId,
            },
        });
    }
    function handleGroupDelete(groupId) {
        console.log('DELETE ME', groupId);
        // first try to delete from DDB, if
        // successful, delete from redux
        async function removeGroupFromDB(groupId) {
            deleteGroup(groupId);
        }
        removeGroupFromDB(groupId).then(() => {
            // now remove the group from redux
            dispatch(removeGroup(groupId));
            return;
        });
    }
    function renderGroupItem(itemData, onClick) {
        return (
            <GroupListItem
                {...itemData.item}
                deleteHandler={handleGroupDelete}
            />
        );
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
                        <View style={styles.titleContainer}>
                            <Text style={styles.title}>Meeting Type</Text>
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
                        // style={{
                        //     flexDirection: 'row',
                        //     justifyContent: 'center',
                        //     marginVertical: 10,
                        // }}
                        >
                            <View style={styles.titleContainer}>
                                <Text style={styles.title}>Attendance</Text>
                            </View>
                            <NumberInput
                                value={parseInt(mAttendance)}
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
                        // style={{
                        //     flexDirection: 'row',
                        //     justifyContent: 'center',
                        //     marginVertical: 10,
                        // }}
                        >
                            <View style={styles.titleContainer}>
                                <Text style={styles.title}>Meals Served</Text>
                            </View>
                            <NumberInput
                                value={parseInt(mMealCount)}
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
                        {mMeetingId !== '0' && (
                            <>
                                <View style={styles.groupDividerRow}>
                                    <Text style={styles.groupHeader}>
                                        Groups
                                    </Text>
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
                                        data={groups}
                                        renderItem={({ item }) => (
                                            <GroupListItem
                                                group={item}
                                                deleteHandler={(gid) =>
                                                    handleGroupDelete(gid)
                                                }
                                            />
                                        )}
                                        keyExtractor={(group) => group.groupId}
                                    />
                                </View>
                            </>
                        )}
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
        // alignItems: 'center',
    },
    meetingFrame: {
        minWidth: '95%',
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
    titleContainer: {
        alignItems: 'center',
        marginVertical: 5,
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
