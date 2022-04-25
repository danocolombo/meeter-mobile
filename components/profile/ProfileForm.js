import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import { getUserProfile } from '../../util/http';
import Input from './Input';
import Button from '../ui/Button';

function ProfileForm({ inputCredentials }) {
    const [userId, setUserId] = useState('');
    const [userName, setUserName] = useState('');
    const [clientId, setClientId] = useState('');
    const [client, setClient] = useState('');
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    // const {
    //     userName: ,
    //     userStree: streetIsValid,
    //     userCity: cityIsValid,
    //     userStateProv: stateIsValid,
    //     userPostalCode: postalCodeIsValid,
    // } = getUserProfile();

    function updateInputValueHandler(inputType, enteredValue) {
        switch (inputType) {
            case 'userName':
                setUserName(enteredValue);
                break;
            case 'userStreet':
                setUserStreet(enteredValue);
                break;
            case 'userCity':
                setUserCity(enteredValue);
                break;
            case 'userStateProv':
                setUserStateProv(enteredValue);
                break;
            case 'userPostalCode':
                setUserPostalCode(enteredValue);
                break;
        }
    }

    function submitHandler() {
        onSubmit({
            userName: userName,
            userStreet: userStreet,
            userCity: userCity,
            userStateProv: userStateProv,
            userPostalCode: userPostalCode,
        });
    }

    return (
        <View style={styles.rootContainer}>
            <View>
                <TextInput mode='outlined' label='First Name' value='' />
                <TextInput mode='outlined' label='Last Name' value='' />
                <TextInput mode='outlined' label='Email' value='' />
                <View style={styles.userInfoFrame}>
                    <TextInput
                        mode='flat'
                        disabled='true'
                        label='User Id'
                        value={userId}
                    />
                    <TextInput
                        mode='flat'
                        disabled='true'
                        label='User Name'
                        value={userName}
                    />
                    <TextInput
                        mode='flat'
                        disabled='true'
                        label='Client Id'
                        value={clientId}
                    />
                    <TextInput
                        mode='flat'
                        disabled='true'
                        label='Client'
                        value={client}
                    />
                </View>
                <View style={styles.buttons}>
                    <Button onPress={submitHandler}>Save</Button>
                </View>
            </View>
        </View>
    );
}

export default ProfileForm;

const styles = StyleSheet.create({
    rootContainer: {
        width: '100%',
    },

    buttons: {
        marginTop: 12,
    },
});
