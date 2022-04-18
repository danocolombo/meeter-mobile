import { useState, useContext } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Alert,
    ScrollView,
    Pressable,
} from 'react-native';
//import SelectDropdown from 'react-native-select-dropdown';
import SelectDropdown from '../ui/DropDown/SelectDropdown';
//import DropDownPicker from 'react-native-dropdown-picker';
import { useNavigation } from '@react-navigation/native';
import { MeetingsContext } from '../../store/meeting-context';
import { HistoricContext } from '../../store/historic-context';
import * as Crypto from 'expo-crypto';
import Button from '../ui/Button';
import GroupCard from '../Group/GroupCard';

import { Colors } from '../../constants/colors';
import Input from '../ui/Input';
import InputNumber from '../ui/InputNumber';
import { dateIsBeforeToday, getUniqueId } from '../../util/helpers';
import { GroupsContext } from '../../store/groups-context';

function onDateChange() {}
function GroupForm({ group, meetingId, navigation, route }) {
    const groupsCtx = useContext(GroupsContext);
    // const navigation = useNavigation();
    //we should always have meetingId. group.groupId might
    //be "0", if new group.
    if (group.groupId === '0') {
        //set default values
        group.groupId = group.groupId;
        group.meetingId = meetingId;
        group.gender = 'x';
        (group.attendance = '0'), (group.title = ''), (group.location = '');
        group.facilitator = '';
        group.cofacilitator = '';
        group.notes = '';
    }
    // convert gender key to string
    switch (group.gender) {
        case 'f':
            group.gender = 'Women';
            break;
        case 'm':
            group.gender = 'Men';
            break;
        case 'x':
            group.gender = 'Mixed';
            break;
        default:
            break;
    }
    // const navigation = useNavigation();
    // const activeCtx = useContext(MeetingsContext);
    // const historicCtx = useContext(HistoricContext);
    // const groupsCtx = useContext(GroupsContext);
    // const meetings = activeCtx.meetings;
    // const historics = historicCtx.meetings;
    // const groups = groupsCtx.groups;

    const [gMeetingId, setGMeetingId] = useState(group.meetingId);
    const [gGroupId, setGGroupId] = useState(group.groupId);
    const [gGender, setGGender] = useState(group.gender);
    const [gAttendance, setGAttendance] = useState(group.attendance);
    const [gTitle, setGTitle] = useState(group.title);
    const [gLocation, setGLocation] = useState(group.location);
    const [gFacilitator, setGFacilitator] = useState(group.facilitator);
    const [gCofacilitator, setGCofacilitator] = useState(group.cofacilitator);
    const [gNotes, setGNotes] = useState(group.notes);

    const genderTypes = ['Women', 'Men', 'Mixed'];
    //   --------METHODS  ------------
    //   =============================
    function changeType(itemValue) {
        setGGender(itemValue);
    }
    function changeAttendance(val) {
        setGAttendance(val);
    }
    function changeTitle(val) {
        setGTitle(val);
    }
    function changeLocation(val) {
        setGLocation(val);
    }
    function changeFacilitator(val) {
        setGFacilitator(val);
    }
    function changeCofacilitator(val) {
        setGCofacilitator(val);
    }
    function changeNotes(val) {
        setGNotes(val);
    }
    function goBack() {
        navigation.goBack();
    }
    //   --------------------------
    //   save the group info
    //   --------------------------
    function confirmGroupHandler() {
        if (parseInt(gAttendance) < 0 || gTitle.length < 3) {
            Alert.alert('Validation Error', 'Check your values', [
                { text: 'OK', style: 'destruction' },
            ]);
            return;
        }
        // convert the gender to database values
        switch (gGender) {
            case 'Women':
                setGGender('f');
                break;
            case 'Men':
                setGGender('m');
                break;
            case 'Mixed':
                setGGender('x');
                break;
            default:
                break;
        }
        if (group.groupId === '0') {
            async function getUni() {
                const digest = await Crypto.digestStringAsync(
                    Crypto.CryptoDigestAlgorithm.SHA256,
                    new Date().toString() + Math.random().toString()
                );
                return digest;
            }
            let uni = getUni()
                .then((result) => {
                    // build group back up to save.
                    const newGroup = {
                        groupId: result,
                        meetingId: gMeetingId,
                        gender: gGender,
                        attendance: gAttendance,
                        title: gTitle,
                        location: gLocation,
                        facilitator: gFacilitator,
                        cofacilitator: gCofacilitator,
                        notes: gNotes,
                    };
                    groupsCtx.addGroup(newGroup);
                    Alert.alert('UPDATE attempt');
                    // navigation.goBack();
                    // async function saveTheGroup() {
                    //     groupsCtx.addGroup(newGroup);
                    // }
                    // saveTheGroup()
                    //     .then(() => navigation.goBack())
                    //     .catch(() => {
                    //         console.error('Can not save group');
                    //     });
                })
                .catch(() => console.log('error generating new groupId'));
        } else {
            //determine if it is active or historical
            const updatedGroup = {
                groupId: gGroupId,
                meetingId: gMeetingId,
                gender: gGender,
                attendance: gAttendance,
                title: gTitle,
                location: gLocation,
                facilitator: gFacilitator,
                cofacilitator: gCofacilitator,
                notes: gNotes,
            };
            groupsCtx.updateGroup(gGroupId, updatedGroup);
            Alert.alert('UPDATE attempt');
        }
    }

    return (
        <ScrollView>
            <View style={styles.groupFrame}>
                <View style={styles.comboRow}>
                    <View style={styles.type}>
                        <View style={styles.meetingCanvasLeft}>
                            <Text style={styles.label}>Group Type</Text>
                            <SelectDropdown
                                data={genderTypes}
                                onSelect={(selectedItem, index) => {
                                    // console.log(selectedItem, index);
                                    setGGender(selectedItem);
                                }}
                                defaultValue={gGender}
                                buttonStyle={{
                                    borderColor: Colors.accent500,
                                    borderWidth: 1,
                                    borderRadius: 2,
                                }}
                                buttonTextAfterSelection={(
                                    selectedItem,
                                    index
                                ) => {
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
                    </View>
                    <View style={styles.count}>
                        <InputNumber
                            label='Attendance'
                            keyboardType='decimal-pad'
                            value={gAttendance}
                            onUpdateValue={changeAttendance}
                        />
                    </View>
                </View>

                <View style={styles.meetingCanvasLeft}>
                    <Input
                        label='Title'
                        value={gTitle}
                        onUpdateValue={changeTitle}
                        style={styles.input}
                    />
                </View>
                <View style={styles.meetingCanvasLeft}>
                    <Input
                        label='Location'
                        value={gLocation}
                        onUpdateValue={changeLocation}
                        style={styles.input}
                    />
                </View>
                <View style={styles.meetingCanvasLeft}>
                    <Input
                        label='Facilitator'
                        value={gFacilitator}
                        onUpdateValue={changeFacilitator}
                        style={styles.input}
                    />
                </View>
                <View style={styles.meetingCanvasLeft}>
                    <Input
                        label='Cofacilitator'
                        value={gCofacilitator}
                        onUpdateValue={changeCofacilitator}
                        style={styles.input}
                    />
                </View>

                <View style={styles.meetingCanvasLeft}>
                    <Input
                        label='Notes'
                        value={gNotes}
                        onUpdateValue={changeNotes}
                        style={styles.input}
                    />
                </View>

                <View style={styles.meetingCanvasCenter}>
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
        </ScrollView>
    );
}

export default GroupForm;

const styles = StyleSheet.create({
    groupFrame: {
        // display: flex,
        flexDirection: 'column',
        flexWrap: 'wrap',
        width: '100%',
        borderColor: Colors.primary800,
        marginTop: 5,
        marginBottom: 3,
        borderWidth: 1,
        borderRadius: 5,
        // paddingLeft: 15,
        // paddingRight: 25,
        // paddingBottom: 10,
        borderColor: Colors.primary800,
        justifyContent: 'center',
        padding: 2,
    },
    meetingCanvasCenter: {
        backgroundColor: Colors.gray10,
        width: '100%',
        alignItems: 'center',
    },
    meetingCanvasLeft: {
        backgroundColor: Colors.gray10,
    },
    rowLeft: {
        alignContent: 'flex-start',
    },
    comboRow: {
        flexGrow: 1,
        flexDirection: 'row',
        display: 'flex',
        width: '80%',
        backgroundColor: Colors.gray10,
    },
    type: {
        flexGrow: 2,
        minWidth: '60%',
        marginRight: 5,
        height: '100%',
    },
    count: {
        minWidth: '10%',
        paddingRight: 5,
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
        // flexDirection: 'row',
        // flexGrow: 1,
        width: '95%',
        marginVertical: 10,
        marginBottom: 10,
        justifyContent: 'center',
        backgroundColor: 'green',
        // alignItems: 'center',
        borderColor: 'black',
        borderWidth: 2,
        borderRadius: 10,
    },
});
