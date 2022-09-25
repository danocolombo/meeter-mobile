import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/styles';
import { printObject } from '../../util/helpers';
function GroupListItem(item) {
    const navigation = useNavigation();

    let group = item.group;

    // translate gender value to display
    let theGender = null;
    switch (group.gender) {
        case 'm':
            theGender = 'Men';
            break;
        case 'f':
            theGender = 'Women';
            break;
        case 'x':
            theGender = '';
        default:
            break;
    }
    function groupPressHandler() {
        navigation.navigate('Group', {
            groupId: group.groupId,
            grpCompKey: group.grpCompKey,
        });
    }
    function deleteHandler() {
        item.deleteHandler(group.groupId);
    }
    return (
        <Pressable
            onPress={groupPressHandler}
            style={({ pressed }) => pressed && styles.pressed}
        >
            <View style={styles.groupItem}>
                <View style={{ flexDirection: 'column', flex: 1 }}>
                    <View>
                        <View>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    width: '100%',
                                }}
                            >
                                <View style={{}}>
                                    <Text
                                        style={[
                                            styles.textBase,
                                            styles.description,
                                        ]}
                                    >
                                        {theGender}
                                        {theGender === 'Men' ||
                                        theGender === 'Women'
                                            ? "'s"
                                            : null}{' '}
                                        {group.title} - {group.location}
                                    </Text>
                                </View>
                                <View
                                    style={{
                                        flex: 1,

                                        // width: '100%',
                                        justifyContent: 'flex-end',
                                        alignItems: 'flex-end',
                                    }}
                                >
                                    <Pressable onPress={() => deleteHandler()}>
                                        <Ionicons
                                            name='trash-outline'
                                            color='white'
                                            size={20}
                                        />
                                    </Pressable>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View>
                        <Text style={[styles.textBase, styles.description]}>
                            {group.facilitator}
                        </Text>
                    </View>
                </View>
            </View>
        </Pressable>
    );
}

export default GroupListItem;

const styles = StyleSheet.create({
    pressed: {
        opacity: 0.75,
    },
    groupItem: {
        padding: 12,
        marginVertical: 8,
        backgroundColor: Colors.primary800,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: 10,
        elevation: 3,
        shadowColor: Colors.primary500,
        shadowRadius: 4,
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.4,
    },
    textBase: {
        color: Colors.primary100,
    },
    attendancetContainer: {
        paddingHorizontal: 12,
        paddingVertical: 4,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        minWidth: 80,
    },
});
