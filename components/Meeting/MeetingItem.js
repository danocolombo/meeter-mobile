import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// import { GlobalStyles } from '../../constants/styles';
import { Colors } from '../../constants/styles';
import { getFormattedDate } from '../../util/date';

function MeetingItem({ meetingId, meetingDate, meetingType, title }) {
    const navigation = useNavigation();

    function meetingPressHandler() {
        // navigation.navigate('ManageMeeting', {
        //     meetingId: meetingId,
        // });
    }

    return (
        <Pressable
            onPress={meetingPressHandler}
            style={({ pressed }) => pressed && styles.pressed}
        >
            <View style={styles.meetingItem}>
                <View>
                    <Text style={styles.meetingDate}>
                        {meetingDate}
                        {/* {getFormattedDate(meetingDate)} */}
                    </Text>
                    <Text style={[styles.textBase, styles.description]}>
                        {meetingType} {title}
                    </Text>
                </View>
            </View>
        </Pressable>
    );
}

export default MeetingItem;

const styles = StyleSheet.create({
    pressed: {
        opacity: 0.75,
    },
    meetingItem: {
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
    meetingDate: {
        color: 'white',
        fontSize: 20,
    },
    description: {
        fontSize: 16,
        marginBottom: 4,
        fontWeight: 'bold',
    },
    amountContainer: {
        paddingHorizontal: 12,
        paddingVertical: 4,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        minWidth: 80,
    },
    amount: {
        color: Colors.primary500,
        fontWeight: 'bold',
    },
});
