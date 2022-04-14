import { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Button from '../ui/Button';
import { Colors } from '../../constants/colors';
import Input from '../ui/Input';

function onDateChange() {}
function MeetingForm() {
    const [mDate, setMDate] = useState();
    const [mType, setMType] = useState();
    const [mSpotlight, setMSpotlight] = useState();
    const [mAttendane, setMAttendance] = useState();

    function changeDate(val) {
        setMDate(val);
    }
    function changeType(val) {
        setMType(val);
    }
    function changeSpotlight(val) {
        setMSpotlight(val);
    }
    function changeAttendance(val) {
        setMAttendance(val);
    }
    return (
        <View style={styles.rootContainer}>
            <Input
                label='Meeting Date'
                value={mDate}
                onUpdateValue={changeDate}
            />
            <Input label='Type' value={mType} onUpdateValue={changeType} />
            <Input
                label='Spotlight'
                value={mSpotlight}
                onUpdateValue={changeSpotlight}
            />
            <Input
                label='Attendance'
                keyboardType='decimal-pad'
                value={mAttendane}
                onUpdateValue={changeAttendance}
            />
            <View>
                <Button>SAVE</Button>
            </View>
        </View>
    );
}

export default MeetingForm;

const styles = StyleSheet.create({
    rootContainer: {
        // flex: 1,
        flexDirection: 'column',
        width: '95%',
        marginTop: 10,
        borderWidth: 1,
        borderRadius: 5,
        padding: 5,
        borderColor: Colors.primary800,
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'black',
    },
    buttons: {
        marginTop: 12,
    },
});
