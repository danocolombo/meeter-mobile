import React, { useContext } from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// import { GlobalStyles } from '../../constants/styles';
import { Colors } from '../../constants/styles';
import { Ionicons } from '@expo/vector-icons';
import { MeetingsContext } from '../../store/meeting-context';
//import { HistoricContext } from '../../store/historic-context';
import { getFormattedDate } from '../../util/date';
import { dateIsBeforeToday } from '../../util/helpers';

function MeetingItem({ meetingId, meetingDate, meetingType, title }) {
    const navigation = useNavigation();
    // const activeCtx = useContext(MeetingsContext);
    // const historicCtx = useContext(HistoricContext);
    // const historicCtx = useContext(HistoricContext);
    const meetingsCtx = useContext(MeetingsContext);
    function meetingPressHandler() {
        navigation.navigate('Meeting', {
            meetingId: meetingId,
        });
        // const msg = 'meetiingId: ' + meetingId;
        Alert.alert('GOING', msg);
    }
    function deleteHandler() {
        //if (dateIsBeforeToday(meetingDate)) {
        // historicCtx.deleteMeeting(meetingId);
        //} else {
        // activeCtx.deleteMeeting(meetingDate);
        //}
        meetingsCtx.deleteMeeting(meetingId);
        // let msg = 'DELETING ' + meetingId;
        // Alert.alert(msg);
    }
    return (
        <Pressable
            onPress={meetingPressHandler}
            style={({ pressed }) => pressed && styles.pressed}
        >
            <View style={styles.meetingItem}>
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
                                    <Text style={styles.meetingDate}>
                                        {meetingDate}
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
                                    <Pressable onPress={deleteHandler}>
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
                            {meetingType} {title}
                        </Text>
                    </View>
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
