import { StyleSheet, Text, View, Pressable } from 'react-native';
import { Colors } from '../../constants/colors';
import { useNavigation } from '@react-navigation/native';

function GroupCard({ group }) {
    const navigation = useNavigation();

    function groupPressHandler() {
        navigation.navigate('Group', {
            groupId: group.groupId,
        });
    }
    return (
        // <View style={[styles.button, mode === 'flat' && styles.flat]}></View>
        <View
            style={[
                styles.cardContainer,
                group.gender === 'f' && styles.female,
            ]}
        >
            <Pressable
                onPress={groupPressHandler}
                style={({ pressed }) => pressed && styles.pressed}
            >
                <View
                    style={[styles.form, group.gender === 'f' && styles.female]}
                >
                    <Text style={styles.title}>{group.title}</Text>
                    <Text style={styles.text}>{group.facilitator}</Text>
                </View>
            </Pressable>
        </View>
    );
}
export default GroupCard;
const styles = StyleSheet.create({
    cardContainer: {
        width: '45%',
        margin: 5,
    },
    form: {
        backgroundColor: Colors.primary400,
        borderWidth: 2,
        borderColor: Colors.primary700,
        borderRadius: 8,
        // width: '80%',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 24,
        color: 'white',
        // marginTop: 8,
    },
    text: {
        color: 'white',
        fontSize: 18,
    },
    female: {
        backgroundColor: Colors.female,
    },
    pressed: {
        opacity: 0.75,
    },
});
