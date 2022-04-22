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

import NumberInput from '../ui/NumberInput/NumberInput';
import GenderButtons from './GenderButtons';
import MeetingTypeButtons from '../Meeting/MeetingTypeButtons';
import { useNavigation } from '@react-navigation/native';

import * as Crypto from 'expo-crypto';
import Button from '../ui/Button';
import GroupListItem from '../Group/GroupListItem';

import { Colors } from '../../constants/colors';
import { dateIsBeforeToday, getUniqueId } from '../../util/helpers';
import { GroupsContext } from '../../store/groups-context';

function onDateChange() {}
function GroupForm({ group, meetingId }) {
    const navigation = useNavigation();
    // const groupsCtx = useContext(GroupsContext);

    let theGroup = {
        meetingId: meetingId,
        groupId: group.groupId,
        gender: group.gender,
        title: group.title,
        attendance: group.attendance,
        location: group.location,
        facilitator: group.facilitator,
        cofacilitator: group.cofacilitator,
        notes: group.notes,
    };
    const groupId = theGroup.groupId;
    //const meetingId = theGroup.meetingId;
    const [gGender, setGGender] = useState(theGroup.gender);
    const [gAttendance, setGAttendance] = useState(theGroup.attendance);
    const [gTitle, setGTitle] = useState(theGroup.title);
    const [gLocation, setGLocation] = useState(theGroup.location);
    const [gFacilitator, setGFacilitator] = useState(theGroup.facilitator);
    const [gCofacilitator, setGCofacilitator] = useState(
        theGroup.cofacilitator
    );
    const [gNotes, setGNotes] = useState(theGroup.notes);

    function confirmGroupHandler(navigation) {
        if (gTitle.length < 3) {
            Alert.alert('Validation Error', 'Title is required.', [
                { text: 'OK', style: 'destruction' },
            ]);
            return;
        }
        Alert.alert('Meeting', { meetingId }, [
            { text: 'OK', style: 'destruction' },
        ]);
        return;
    }
    return (
        <View style={styles.rootContainer}>
            <KeyboardAvoidingView>
                <View style={{ flexDirection: 'column', minWidth: '95%' }}>
                    <View style={styles.groupFrame}>
                        <View>
                            <GenderButtons
                                currentType={gGender}
                                onChange={setGGender}
                            />
                        </View>
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
                        <View
                            style={{
                                // flexDirection: 'row',
                                alignItems: 'center',
                                // marginVertical: 10,
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
                                value={gAttendance}
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
                        <View style={{ marginHorizontal: 10 }}>
                            <View style={styles.buttonContainer}>
                                <Button
                                    onPress={() => {}}
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
        alignItems: 'center',
    },
    groupFrame: {
        // flex: 0.9,
        borderColor: Colors.primary800,
        marginTop: 5,
        borderWidth: 2,
        borderRadius: 5,
        borderColor: Colors.primary800,
        justifyContent: 'center',
        padding: 5,
        width: '100%',
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
