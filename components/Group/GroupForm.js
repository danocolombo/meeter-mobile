import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Alert,
    // FlatList,
    // Pressable,
    // ScrollView,
    KeyboardAvoidingView,
    LogBox,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { TextInput } from 'react-native-paper';
import NumberInput from '../ui/NumberInput/NumberInput';
import GenderButtons from './GenderButtons';
// import MeetingTypeButtons from '../Meeting/MeetingTypeButtons';
import { useNavigation } from '@react-navigation/native';
// import * as Crypto from 'expo-crypto';
import { addGroup } from '../../providers/groups';
import { addMeetingGroup } from '../../features/groups/groupsSlice';
import Button from '../ui/Button';
// import GroupListItem from '../Group/GroupListItem';
import { Colors } from '../../constants/colors';
import { getUniqueId, printObject } from '../../util/helpers';
import { saveActiveMeetings } from '../../features/meetings/meetingsSlice';

// function onDateChange() {}
// groupId = { groupId };
// grpCompKey = { grpCompKey };
// meetingInfo = { meetingInfo };
function GroupForm({ groupId, grpCompKey, meetingInfo }) {
    const navHook = useNavigation();
    const dispatch = useDispatch();
    const client = useSelector((state) => state.user.activeClient);
    const groups = useSelector((state) => state.groups.meetingGroups);
    const [gGender, setGGender] = useState('');
    const [gGroupId, setGGroupId] = useState('');
    const [gGrpCompKey, setGGrpCompKey] = useState('');
    const [gAttendance, setGAttendance] = useState(0);
    const [gMeetingId, setGMeetingId] = useState('');
    const [gTitle, setGTitle] = useState('');
    const [gLocation, setGLocation] = useState('');
    const [gFacilitator, setGFacilitator] = useState('');
    const [gCofacilitator, setGCofacilitator] = useState('');
    const [gNotes, setGNotes] = useState('');
    // console.log('TEST_groupId:', groupId);
    // console.log('TEST_meetingId:', meetingInfo.meetingId);
    // console.log('TEST_meetingDate:', meetingInfo.meetingDate);
    // console.log('TEST_mtgCompKey:', meetingInfo.mtgCompKey);
    // console.log('INSIDE GroupForm (meetingInfo):', meetingInfo);
    // console.log('groupId:', groupId);
    // console.log('grpCompkey:', grpCompKey);
    // printObject('meetingInfo', meetingInfo);
    useEffect(() => {
        LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
        if (groupId === '0') {
            // new group
            setGGender('f');
            setGAttendance(0);
            setGTitle('');
            setGLocation('');
            setGFacilitator('');
            setGCofacilitator('');
            setGNotes('');
        } else {
            // we need to get the group
            const theGroup = groups.find((grp) => grp.groupId === groupId);

            setGGender(theGroup.gender);
            setGTitle(theGroup.title);
            setGLocation(theGroup.location);
            setGGrpCompKey(theGroup.grpCompKey);
            setGGroupId(theGroup.groupId);
            setGMeetingId(theGroup.meetingId);
            setGAttendance(theGroup.attendance);
            setGNotes(theGroup.notes);
            setGCofacilitator(theGroup.cofacilitator);
            setGFacilitator(theGroup.facilitator);
        }
    }, []);

    function confirmGroupHandler(navigation) {
        if (
            (gGender !== 'f' && gGender !== 'm' && gGender !== 'x') ||
            gTitle.length < 3 ||
            parseInt(gAttendance) < 0 ||
            parseInt(gAttendance) > 25
        ) {
            Alert.alert('Validation Error', 'Title & gender are required.', [
                { text: 'OK', style: 'destruction' },
            ]);
            return;
        }
        if (groupId === '0') {
            // async function getUni() {
            //     let digest = getUniqueId();
            //     return digest;
            // }
            let grpCompKey = client + '#' + meetingInfo.meetingId;
            let uni = getUniqueId()
                .then((result) => {
                    let newGroup = {
                        groupId: result,
                        meetingId: meetingInfo.meetingId,
                        grpCompKey: grpCompKey,
                        clientId: client,

                        gender: gGender,
                        title: gTitle,
                        location: gLocation,
                        facilitator: gFacilitator,
                        cofacilitator: gCofacilitator,
                        attendance: gAttendance,
                        notes: gNotes,
                    };

                    async function dbUpdateResults() {
                        printObject('newGrooup before', newGroup);
                        let confirmedGroup = addGroup(newGroup);
                        printObject('confirmedGroup', confirmedGroup);
                        return confirmedGroup;
                    }
                    dbUpdateResults()
                        .then((results) => {
                            printObject('results', results);
                            dispatch(addMeetingGroup(newGroup));
                            navHook.goBack();
                        })
                        .catch((err) => {
                            console.log('error writing to db(05230437)\n', err);
                        });
                })
                .catch((err) => console.log('new group save error\n', err));
            navHook.goBack();
        } else {
            const updatedGroup = {
                groupId: gGroupId,
                meetingId: gMeetingId,
                grpCompKey: gGrpCompKey,
                clientId: client,
                gender: gGender,
                title: gTitle,
                location: gLocation,
                facilitator: gFacilitator,
                cofacilitator: gCofacilitator,
                attendance: gAttendance,
                notes: gNotes,
            };
            async function dbUpdateResults() {
                let confirmedGroup = addGroup(updatedGroup);
                return confirmedGroup;
            }
            dbUpdateResults()
                .then((results) => {
                    dispatch(addMeetingGroup(results));
                    // navHook.goBack();
                })
                .catch((err) => {
                    console.log('error writing to db(05231003)\n', err);
                });
            return;
        }

        return;
    }
    return (
        <View style={styles.rootContainer}>
            <KeyboardAvoidingView>
                <View>
                    <View style={styles.groupFrame1}>
                        <GenderButtons
                            currentType={gGender}
                            onChange={setGGender}
                        />

                        <View>
                            <TextInput
                                mode='outlined'
                                label='Title'
                                value={gTitle}
                                onChangeText={setGTitle}
                            />
                        </View>
                        <View>
                            <TextInput
                                mode='outlined'
                                label='Location'
                                value={gLocation}
                                onChangeText={setGLocation}
                            />
                        </View>
                        <View>
                            <TextInput
                                mode='outlined'
                                label='Facilitator'
                                value={gFacilitator}
                                onChangeText={setGFacilitator}
                            />
                        </View>
                        <View>
                            <TextInput
                                mode='outlined'
                                label='Co-Facilitator'
                                value={gCofacilitator}
                                onChangeText={setGCofacilitator}
                            />
                        </View>
                        <View style={styles.attendanceSection}>
                            <View style={styles.attendanceWrapper}>
                                <Text style={styles.label}>Attendance</Text>
                            </View>
                            <NumberInput
                                value={parseInt(gAttendance)}
                                onAction={setGAttendance}
                            />
                        </View>
                        <View>
                            <TextInput
                                mode='outlined'
                                label='Notes & Comments'
                                value={gNotes}
                                multiline={true}
                                numberOfLines={2}
                                onChangeText={setGNotes}
                            />
                        </View>
                        <View style={styles.saveWrapper}>
                            <View style={styles.buttonContainer}>
                                <Button
                                    onPress={confirmGroupHandler}
                                    customStyle={{ backgroundColor: 'green' }}
                                >
                                    SAVE
                                </Button>
                            </View>
                        </View>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </View>
    );
}

export default GroupForm;

const styles = StyleSheet.create({
    rootContainer: {
        // flex: 1,
        minWidth: '98%',
        alignItems: 'center',
        marginTop: 5,
        borderWidth: 2,
        borderRadius: 5,
        borderColor: Colors.gray75,
        // padding: 5,
    },
    groupFrame: {
        minWidth: '100%',
        borderColor: Colors.primary800,
        marginTop: 5,
        borderWidth: 2,
        borderRadius: 5,
        borderColor: Colors.primary800,
        justifyContent: 'center',
        padding: 5,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
        flex: 0.9,
    },
    comboRow: {
        flexDirection: 'column',
        flex: 0.8,
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
    attendanceSection: {
        marginVertical: 5,
    },
    attendanceWrapper: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 10,
    },
    saveWrapper: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    buttonContainer: {
        width: '80%',
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
