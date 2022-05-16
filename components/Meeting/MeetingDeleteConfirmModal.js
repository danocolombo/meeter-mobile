import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Button from '../ui/Button';
import { Colors } from '../../constants/colors';
const MeetingDeleteConfirmModal = ({
    onConfirmPress,
    onCancelPress,
    meeting,
}) => {
    return (
        <>
            <View style={styles.deleteModalContainter}>
                <View style={styles.modalFrame}>
                    <View style={styles.deleteModalContent}>
                        <Text style={styles.modalText}>
                            Are you sure you want to delete?
                        </Text>
                    </View>
                    <View style={styles.deleteModalMeetingDetails}>
                        <Text style={styles.confirmText}>
                            {meeting.meetingDate}
                        </Text>
                        <Text style={styles.confirmText}>
                            {meeting.meetingType}
                        </Text>
                        <Text style={styles.confirmText}>{meeting.title}</Text>
                    </View>
                    <View style={styles.deleteModalContent}>
                        <Text style={styles.modalText}>Please confirm</Text>
                    </View>
                    <View style={styles.modalButtonContainer}>
                        <View style={styles.modalButton}>
                            <Button
                                onPress={onConfirmPress}
                                customStyle={{ backgroundColor: 'red' }}
                            >
                                Delete
                            </Button>
                        </View>
                        <View style={styles.modalButton}>
                            <Button
                                onPress={onCancelPress}
                                customStyle={
                                    {
                                        // backgroundColor: 'white',
                                    }
                                }
                            >
                                Cancel
                            </Button>
                        </View>
                    </View>
                </View>
            </View>
        </>
    );
};

export default MeetingDeleteConfirmModal;
const styles = StyleSheet.create({
    pressed: {
        opacity: 0.75,
    },
    deleteModalContainter: {
        backgroundColor: Colors.gray20,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalFrame: {
        padding: 20,
        backgroundColor: 'white',
        borderWidth: 2,
        borderColor: 'black',
        borderRadius: 8,
    },
    deleteModalContent: {
        flexDirection: 'row',
        marginVertical: 15,
        justifyContent: 'center',
    },
    deleteModalMeetingDetails: {
        flexDirection: 'column',
        alignItems: 'center',
        paddingVertical: 10,
        borderRadius: 8,
        backgroundColor: Colors.primary400,
    },
    modalText: {
        fontWeight: 'bold',
    },
    confirmText: {
        fontSize: 24,
    },
    modalButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    modalButton: {
        width: '40%',
    },
});
