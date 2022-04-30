import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Colors } from '../../constants/styles';

function GroupListItem({
    groupId,
    meetingId,
    gender,
    attendance,
    title,
    location,
    facilitator,
    cofacilitator,
    notes,
}) {
    const navigation = useNavigation();
    const group = {
        groupId: groupId,
        meetingId: meetingId,
        gender: gender,
        attendance: attendance,
        title: title,
        location: location,
        facilitator: facilitator,
        cofacilitator: cofacilitator,
        notes: notes,
    };
    // translate gender value to display
    switch (group.gender) {
        case 'm':
            group.gender = 'Men';
            break;
        case 'f':
            group.gender = 'Women';
            break;
        case 'x':
            group.gender = '';
        default:
            break;
    }
    function groupPressHandler() {
        navigation.navigate('Group', {
            meetingId: meetingId,
            groupId: group.groupId,
        });
    }

    return (
        <Pressable
            onPress={groupPressHandler}
            style={({ pressed }) => pressed && styles.pressed}
        >
            <View style={styles.groupItem}>
                <View>
                    <Text style={[styles.textBase, styles.description]}>
                        {group.gender}
                        {group.gender === 'Men' || group.gender === 'Women'
                            ? "'s"
                            : null}{' '}
                        {group.title} - {group.location}
                    </Text>
                    <Text style={[styles.textBase, styles.description]}>
                        {group.facilitator}
                    </Text>
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
