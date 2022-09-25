import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Colors } from '../../constants/colors';

function Button({ children, onPress, customStyle }) {
    return (
        <Pressable
            style={({ pressed }) => [
                styles.button,
                pressed && styles.pressed,
                customStyle,
            ]}
            onPress={onPress}
        >
            <View>
                <Text style={[styles.buttonText]}>{children}</Text>
            </View>
        </Pressable>
    );
}

export default Button;

const styles = StyleSheet.create({
    button: {
        margin: 2,
        borderRadius: 6,
        paddingVertical: 4,
        paddingHorizontal: 12,
        backgroundColor: Colors.primary500,
        elevation: 2,
        // shadowColor: 'black',
        // shadowOffset: { width: 1, height: 1 },
        // shadowOpacity: 0.25,
        // shadowRadius: 4,
    },
    pressed: {
        opacity: 0.7,
    },
    buttonText: {
        textAlign: 'center',
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
