import { useState } from 'react';
import { Alert, StyleSheet, View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import FlatButton from '../ui/FlatButton';
import AuthForm from './AuthForm';
import { Colors } from '../../constants/colors';

function AuthContent({ isLogin, onAuthenticate }) {
    const navigation = useNavigation();

    const [credentialsInvalid, setCredentialsInvalid] = useState({
        email: false,
        password: false,
        confirmEmail: false,
        confirmPassword: false,
    });

    function switchAuthModeHandler() {
        if (isLogin) {
            navigation.replace('Signup');
        } else {
            navigation.replace('Login');
        }
    }

    function submitHandler(credentials) {
        let { email, confirmEmail, password, confirmPassword } = credentials;

        email = email.trim();
        password = password.trim();

        const emailIsValid = email.includes('@');
        const passwordIsValid = password.length > 6;
        const emailsAreEqual = email === confirmEmail;
        const passwordsAreEqual = password === confirmPassword;

        if (
            !emailIsValid ||
            !passwordIsValid ||
            (!isLogin && (!emailsAreEqual || !passwordsAreEqual))
        ) {
            Alert.alert(
                'Invalid input',
                'Please check your entered credentials.'
            );
            setCredentialsInvalid({
                email: !emailIsValid,
                confirmEmail: !emailIsValid || !emailsAreEqual,
                password: !passwordIsValid,
                confirmPassword: !passwordIsValid || !passwordsAreEqual,
            });
            return;
        }
        onAuthenticate({ email, password });
    }

    return (
        <>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>
                    {isLogin ? 'LOGIN' : 'SIGN-UP'}
                </Text>
            </View>

            <View style={styles.authContent}>
                <AuthForm
                    isLogin={isLogin}
                    onSubmit={submitHandler}
                    credentialsInvalid={credentialsInvalid}
                />
                <View style={styles.buttons}>
                    <FlatButton onPress={switchAuthModeHandler}>
                        {isLogin ? 'Create a new user' : 'Log in instead'}
                    </FlatButton>
                </View>
            </View>
        </>
    );
}

export default AuthContent;

const styles = StyleSheet.create({
    titleContainer: {
        alignItems: 'center',
        marginVertical: 20,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 24,
        color: Colors.primary800,
    },
    authContent: {
        marginTop: 0,
        marginHorizontal: 32,
        padding: 16,
        borderRadius: 8,
        backgroundColor: Colors.primary800,
        elevation: 2,
        shadowColor: 'black',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.35,
        shadowRadius: 4,
    },
    buttons: {
        marginTop: 8,
    },
});
