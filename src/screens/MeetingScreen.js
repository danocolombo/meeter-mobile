import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MeetingForm from '../components/Meeting/MeetingForm';

function MeetingScreen({ route, navigation }) {
    const meetingId = route.params.meetingId;
    const meetingDate = route.params.meetingDate;
    useEffect(() => {}, []);
    return (
        <>
            <MeetingForm meetingId={meetingId} navigation />
        </>
    );
}
export default MeetingScreen;
const styles = StyleSheet.create({});
