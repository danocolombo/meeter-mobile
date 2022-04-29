import React, { useContext } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Colors } from '../../../constants/colors';
import { Ionicons } from '@expo/vector-icons';
import { MeeterContext } from '../../../store/meeter-context';

function UserItem({ userId, firstName, lastName, role, status }) {
    const navigation = useNavigation();
    const meeterCtx = useContext(MeeterContext);
    function userPressHandler() {
        navigation.navigate('User', {
            userId: userId,
        });
    }
    function deleteHandler() {
        meeterCtx.deleteUser(userId);
    }
    return (
        <Pressable
            onPress={userPressHandler}
            style={({ pressed }) => pressed && styles.pressed}
        >
            <View style={styles.userItem}>
                <View style={{ flexDirection: 'column', flex: 1 }}>
                    <View>
                        <View>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    width: '100%',
                                }}
                            >
                                <View style={{}}>
                                    <Text style={styles.textBase}>
                                        {firstName}
                                    </Text>
                                </View>
                                <View
                                    style={{
                                        flex: 1,

                                        // width: '100%',
                                        justifyContent: 'flex-end',
                                        alignItems: 'flex-end',
                                    }}
                                >
                                    <Pressable onPress={deleteHandler}>
                                        <Ionicons
                                            name='trash-outline'
                                            color='white'
                                            size={20}
                                        />
                                    </Pressable>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View>
                        <Text style={[styles.textBase, styles.description]}>
                            {role}:{status}
                        </Text>
                    </View>
                </View>
            </View>
        </Pressable>
    );
}

export default UserItem;

const styles = StyleSheet.create({
    pressed: {
        opacity: 0.75,
    },
    userItem: {
        padding: 12,
        marginVertical: 8,
        backgroundColor: Colors.primary800,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: 10,
        elevation: 3,
        shadowColor: Colors.primary500,
        shadowRadius: 4,
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.4,
    },
    textBase: {
        color: Colors.primary100,
    },
    description: {
        fontSize: 16,
        marginBottom: 4,
        fontWeight: 'bold',
    },
});
