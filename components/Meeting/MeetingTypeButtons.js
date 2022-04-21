import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-paper';

function MeetingTypeButtons({ currentType, onChange }) {
    // const [mType, setMType] = useState('lesson');
    return (
        // <View style={{ flexDirection: 'column', flex: 1, marginTop: 70 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <Button
                style={{ flex: 0.3, margin: 5 }}
                icon=''
                mode='contained'
                dark={currentType === 'Lesson'}
                onPress={() => onChange('Lesson')}
            >
                <Text style={{ fontWeight: 'bold', fontSize: 10 }}>Lesson</Text>
            </Button>
            <Button
                style={{ flex: 0.3, margin: 5 }}
                icon=''
                mode='contained'
                dark={currentType === 'Testimony'}
                onPress={() => onChange('Testimony')}
            >
                <Text style={{ fontWeight: 'bold', fontSize: 10 }}>
                    Testimony
                </Text>
            </Button>
            <Button
                style={{ flex: 0.3, margin: 5 }}
                icon=''
                mode='contained'
                dark={currentType === 'Special'}
                onPress={() => onChange('Special')}
            >
                <Text style={{ fontWeight: 'bold', fontSize: 10 }}>
                    Special
                </Text>
            </Button>
        </View>
        // </View>
    );
}

export default MeetingTypeButtons;
