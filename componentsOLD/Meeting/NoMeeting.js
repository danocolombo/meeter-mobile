import { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import { Colors } from '../../constants/colors';
import { useNavigation } from '@react-navigation/native';

function NoMeeting() {
    const navigation = useNavigation();
    return (
        <View style={styles.rootContainer}>
            <View style={styles.messageContainer}>
                <View>
                    <Text style={styles.title}>No Active Meetings</Text>
                </View>
                <View style={styles.subTextArea}>
                    <Text style={styles.subText}>
                        You may have historical meetings.
                    </Text>
                    <Text style={styles.subText}>
                        You can add new active meetings if desired.
                    </Text>
                </View>
            </View>
        </View>
    );
}
export default NoMeeting;
const styles = StyleSheet.create({
    rootContainer: {
        borderWidth: 2,
        borderColor: 'black',
        marginHorizontal: 20,
        marginVertical: 15,
        borderRadius: 10,
        backgroundColor: Colors.primary500,
    },
    messageContainer: {
        // flexDirection: 'column',
        // flex: 1,
        alignItems: 'center',
        marginVertical: 10,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 24,
        color: 'white',
    },
    subTextArea: {
        alignItems: 'center',
        marginVertical: 10,
    },
    subText: {
        fontSize: 16,
    },
});
