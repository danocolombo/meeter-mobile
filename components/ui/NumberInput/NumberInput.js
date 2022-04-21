import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';

import { RoundedButton } from './RoundedButton';

function NumberInput({ value, onAction }) {
    const increaseValue = () => {
        const newOne = value + 1;
        onAction(newOne);
    };
    const decreaseValue = () => {
        if (value > 0) {
            onAction(value - 1);
        } else {
            onAction(0);
        }
    };

    return (
        <View>
            <View
                style={{
                    flexDirection: 'row',
                    alightItems: 'flexStart',
                    backgroundColor: 'white',
                    justifyContent: 'center',
                }}
            >
                <RoundedButton
                    title='-'
                    size={25}
                    textStyle={{
                        color: 'black',
                        fontSize: 16,
                        alignItems: 'center',
                    }}
                    onPress={decreaseValue}
                />
                <View style={styles.numberBox}>
                    <Text style={styles.number}>{value}</Text>
                </View>
                <RoundedButton
                    title='+'
                    size={25}
                    textStyle={{
                        color: 'black',
                        fontSize: 16,
                        alignItems: 'center',
                    }}
                    onPress={increaseValue}
                />
            </View>
        </View>
    );
}
export default NumberInput;

const styles = StyleSheet.create({
    root: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
    },
    numberBox: {
        paddingHorizontal: 10,
        borderWidth: 1,
        marginLeft: 10,
        marginRight: 10,
        backgroundColor: 'yellow',
        alignItems: 'center',
        justifyContent: 'center',
    },
    number: {},
});
