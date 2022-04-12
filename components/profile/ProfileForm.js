import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { getUserProfile } from '../../util/http';
import Input from './Input';
import Button from '../ui/Button';

function ProfileForm({ inputCredentials }) {
    const [userName, setUserName] = useState('');
    const [userStreet, setUserStreet] = useState('');
    const [userCity, setUserCity] = useState('');
    const [userStateProv, setUserStateProv] = useState('');
    const [userPostalCode, setUserPostalCode] = useState('');

    const {
        userName: nameIsValid,
        userStree: streetIsValid,
        userCity: cityIsValid,
        userStateProv: stateIsValid,
        userPostalCode: postalCodeIsValid,
    } = getUserProfile();

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
        <View style={styles.form}>
            <View>
                <Input
                    label='Your Name'
                    onUpdateValue={updateInputValueHandler.bind(
                        this,
                        'userName'
                    )}
                    value={userName}
                    // keyboardType=''
                    isInvalid={nameIsValid}
                />
                <Input
                    label='Street'
                    onUpdateValue={updateInputValueHandler.bind(
                        this,
                        'userStreet'
                    )}
                    value={userStreet}
                    // keyboardType=''
                    isInvalid={streetIsValid}
                />
                <Input
                    label='City'
                    onUpdateValue={updateInputValueHandler.bind(
                        this,
                        'userCity'
                    )}
                    value={userCity}
                    // keyboardType=''
                    isInvalid={cityIsValid}
                />
                <Input
                    label='State'
                    onUpdateValue={updateInputValueHandler.bind(
                        this,
                        'userStateProv'
                    )}
                    value={userStateProv}
                    // keyboardType=''
                    isInvalid={stateIsValid}
                />
                <Input
                    label='Postal Code'
                    onUpdateValue={updateInputValueHandler.bind(
                        this,
                        'userPostalCode'
                    )}
                    value={userPostalCode}
                    // keyboardType=''
                    isInvalid={postalCodeIsValid}
                />

                <View style={styles.buttons}>
                    <Button onPress={submitHandler}>Save</Button>
                </View>
            </View>
        </View>
    );
}

export default ProfileForm;

const styles = StyleSheet.create({
    buttons: {
        marginTop: 12,
    },
});
