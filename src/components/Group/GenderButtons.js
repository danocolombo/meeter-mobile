import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

function GenderButtons({ currentType, onChange }) {
    return (
        <View style={styles.buttonContainer}>
            <View style={styles.buttonWrapper}>
                <Button
                    style={styles.button}
                    icon=''
                    mode='contained'
                    dark={currentType === 'f'}
                    onPress={() => onChange('f')}
                >
                    <Text style={styles.button}>Women</Text>
                </Button>
            </View>
            <View style={styles.buttonWrapper}>
                <Button
                    icon=''
                    mode='contained'
                    dark={currentType === 'm'}
                    onPress={() => onChange('m')}
                >
                    <Text style={styles.button}>Men</Text>
                </Button>
            </View>
            <View style={styles.buttonWrapper}>
                <Button
                    // style={{ flex: 0.3, margin: 5 }}
                    icon=''
                    mode='contained'
                    dark={currentType === 'x'}
                    onPress={() => onChange('x')}
                >
                    <Text style={styles.button}>Mixed</Text>
                </Button>
            </View>
        </View>
    );
}

export default GenderButtons;
const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginHorizontal: 5,
        // borderWidth: 5,
        // borderColor: 'blue',
    },
    buttonWrapper: {
        flex: 1,
        padding: 5,
        minWidth: 120,
    },
    button: {
        fontWeight: 'bold',
        fontSize: 12,
    },
});
