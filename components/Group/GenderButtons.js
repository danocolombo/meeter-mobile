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
                    dark={currentType === 'Women'}
                    onPress={() => onChange('Women')}
                >
                    <Text style={{ fontWeight: 'bold', fontSize: 10 }}>
                        Women
                    </Text>
                </Button>

                <Button
                    style={{ flex: 0.3, margin: 5 }}
                    icon=''
                    mode='contained'
                    dark={currentType === 'Men'}
                    onPress={() => onChange('Men')}
                >
                    <Text style={{ fontWeight: 'bold', fontSize: 10 }}>
                        Men
                    </Text>
                </Button>

                <Button
                    style={{ flex: 0.3, margin: 5 }}
                    icon=''
                    mode='contained'
                    dark={currentType === 'Mixed'}
                    onPress={() => onChange('Mixed')}
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
