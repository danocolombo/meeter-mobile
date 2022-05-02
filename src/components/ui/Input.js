import { View, Text, TextInput, StyleSheet } from 'react-native';

import { Colors } from '../../constants/colors';

function Input({
    label,
    keyboardType,
    secure,
    onUpdateValue,
    value,
    isInvalid,
}) {
    return (
        <View style={styles.inputContainer}>
            <Text style={[styles.label, isInvalid && styles.labelInvalid]}>
                {label}
            </Text>
            <TextInput
                style={[styles.input, isInvalid && styles.inputInvalid]}
                // autoCapitalize={false}
                // autoCapitalize='none'
                keyboardType={keyboardType}
                secureTextEntry={secure}
                onChangeText={onUpdateValue}
                value={value}
            />
        </View>
    );
}

export default Input;

const styles = StyleSheet.create({
    inputContainer: {
        marginVertical: 0,
    },
    label: {
        color: 'black',
        fontSize: 20,
        marginBottom: 4,
        marginTop: 2,
    },
    labelInvalid: {
        color: Colors.error500,
    },
    input: {
        paddingVertical: 2,
        paddingHorizontal: 6,
        backgroundColor: Colors.primary100,
        borderRadius: 4,
        fontSize: 16,
        minHeight: 30,
        minWidth: '75%',
    },
    inputInvalid: {
        backgroundColor: Colors.error100,
    },
});
