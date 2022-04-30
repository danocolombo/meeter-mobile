import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-paper';

function GenderButtons({ currentType, onChange }) {
    return (
        <View>
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                <Button
                    style={{ flex: 0.3, margin: 5 }}
                    icon=''
                    mode='contained'
                    dark={currentType === 'f'}
                    onPress={() => onChange('f')}
                >
                    <Text style={{ fontWeight: 'bold', fontSize: 10 }}>
                        Women
                    </Text>
                </Button>

                <Button
                    style={{ flex: 0.3, margin: 5 }}
                    icon=''
                    mode='contained'
                    dark={currentType === 'm'}
                    onPress={() => onChange('m')}
                >
                    <Text style={{ fontWeight: 'bold', fontSize: 10 }}>
                        Men
                    </Text>
                </Button>

                <Button
                    style={{ flex: 0.3, margin: 5 }}
                    icon=''
                    mode='contained'
                    dark={currentType === 'x'}
                    onPress={() => onChange('x')}
                >
                    <Text style={{ fontWeight: 'bold', fontSize: 10 }}>
                        Mixed
                    </Text>
                </Button>
            </View>
        </View>
    );
}

export default GenderButtons;
