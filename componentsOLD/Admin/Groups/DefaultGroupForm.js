import React, { useState, useContext } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Alert,
    // FlatList,
    // Pressable,
    // ScrollView,
    KeyboardAvoidingView,
} from 'react-native';
import { MeeterContext } from '../../../store/meeter-context';
import { TextInput } from 'react-native-paper';
import NumberInput from '../../ui/NumberInput/NumberInput';
import GenderButtons from '../../Group//GenderButtons';
// import MeetingTypeButtons from '../Meeting/MeetingTypeButtons';
import { useNavigation } from '@react-navigation/native';
// import * as Crypto from 'expo-crypto';

import Button from '../../ui/Button';
// import GroupListItem from '../Group/GroupListItem';
import { Colors } from '../../../constants/colors';
import { getUniqueId } from '../../../util/helpers';
import { GroupsContext } from '../../../store/groups-context';

// function onDateChange() {}
function DefaultGroupForm({ route, navigation }) {
    // const navigation = useNavigation();
    const { groupId, gender, title, location, facilitator } = route.params;
    const meeterCtx = useContext(MeeterContext);

    let theGroup = {
        groupId: '0',
        gender: '',
        title: '',
        location: '',
        facilitator: '',
    };

    const [groupIdState, setGroupIdState] = useState(groupId);
    const [genderState, setGenderState] = useState(gender);
    const [titleState, setTitleState] = useState(title);
    const [locationState, setLocationState] = useState(location);
    const [facilitatorState, setFacilitatorState] = useState(facilitator);

    function confirmGroupHandler(navigation) {
        if (
            (genderState !== 'f' &&
                genderState !== 'm' &&
                genderState !== 'x') ||
            titleState.length < 3
        ) {
            Alert.alert('Validation Error', 'Title & gender is required.', [
                { text: 'OK', style: 'destruction' },
            ]);
            return;
        }
        if (groupIdState) {
            //save the group
            const updatedGroup = {
                groupId: groupIdState,
                gender: genderState,
                title: titleState,
                location: locationState,
                facilitator: facilitatorState,
            };
            meeterCtx.updateDefaultGroup(updatedGroup);

            Alert.alert('Group Updated', 'Your changes were saved', [
                { text: 'OK', style: 'destruction' },
            ]);
        } else {
            getUniqueId()
                .then((newId) => {
                    const newGroup = {
                        groupId: newId,
                        gender: genderState,
                        title: titleState,
                        location: locationState,
                        facilitator: facilitatorState,
                    };
                    meeterCtx.addDefaultGroup(newGroup);
                    Alert.alert('Group Added', 'Your changes were saved', [
                        { text: 'OK', style: 'destruction' },
                    ]);
                })
                .catch((error) => {
                    // console.log('error getting unique Id\n', error);
                    Alert.alert('Error', 'Error adding your group', [
                        { text: 'OK', style: 'destruction' },
                    ]);
                    return;
                });
        }

        return;
    }
    return (
        <View style={styles.rootContainer}>
            <KeyboardAvoidingView>
                <View style={{ flexDirection: 'column', minWidth: '95%' }}>
                    <View style={styles.groupFrame}>
                        <View>
                            <GenderButtons
                                currentType={genderState}
                                onChange={setGenderState}
                            />
                        </View>
                        <View>
                            <TextInput
                                mode='outlined'
                                label='Title'
                                value={titleState}
                                onChangeText={setTitleState}
                            />
                        </View>
                        <View>
                            <TextInput
                                mode='outlined'
                                label='Location'
                                value={locationState}
                                onChangeText={setLocationState}
                            />
                        </View>
                        <View>
                            <TextInput
                                mode='outlined'
                                label='Facilitator'
                                value={facilitatorState}
                                onChangeText={setFacilitatorState}
                            />
                        </View>

                        <View style={{ marginHorizontal: 10 }}>
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

export default DefaultGroupForm;

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
