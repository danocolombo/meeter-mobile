import { useState, useContext, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import { MeeterContext } from '../../store/meeter-context';
import Button from '../ui/Button';

function ProfileForm() {
    const meeterCtx = useContext(MeeterContext);
    const [userId, setUserId] = useState(meeterCtx.profile._id);
    const [userName, setUserName] = useState(meeterCtx.profile.userName);
    const [clientId, setClientId] = useState(meeterCtx.profile.defaultClientId);
    const [client, setClient] = useState(meeterCtx.profile.defaultClient);
    const [email, setEmail] = useState(meeterCtx.profile.email);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    // if (meeterCtx.profile.name) {
    //     const wholeName = meeterCtx.profile.name;
    //     const namePart = wholeName.split(' ');
    //     setFirstName(namePart[0]);
    //     setLastName(namePart[1]);
    // }

    useEffect(() => {}, [meeterCtx.profile]);
    function updateInputValueHandler(inputType, enteredValue) {
        switch (inputType) {
            case 'userName':
                setUserName(enteredValue);
                break;
            case 'firstName':
                setFirstName(enteredValue);
                break;
            case 'lastName':
                setLastName(enteredValue);
                break;
            case 'clientId':
                setClientId(enteredValue);
                break;
        }
    }

    function submitHandler() {
        onSubmit({
            userName: userName,
            firstName: firstName,
            lastName: lastName,
        });
    }

    return (
        <View style={styles.rootContainer}>
            <View>
                <TextInput
                    mode='outlined'
                    label='First Name'
                    value={firstName}
                />
                <TextInput mode='outlined' label='Last Name' value={lastName} />
                <TextInput mode='outlined' label='Email' value={email} />
                <View style={styles.userInfoFrame}>
                    <TextInput
                        mode='flat'
                        style={styles.reservedData}
                        disabled='true'
                        label='User Id'
                        value={userId}
                    />
                    <TextInput
                        mode='flat'
                        style={styles.reservedData}
                        disabled='true'
                        label='User Name'
                        value={userName}
                    />
                    <TextInput
                        mode='flat'
                        style={styles.reservedData}
                        disabled='true'
                        label='Client Id'
                        value={clientId}
                    />
                    <TextInput
                        mode='flat'
                        style={styles.reservedData}
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
    reservedData: {
        fontSize: 12,
    },
    buttons: {
        marginTop: 12,
    },
});
