import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { Auth } from 'aws-amplify';

const AmplifySignOut = () => {
    useEffect(() => {
        Auth.signOut()
            .then(() => console.log('logout'))
            .catch((err) => console.log('LOGOUT Error\n', err));
    }, []);

    return (
        <View>
            <Text>AmplifySignOut</Text>
        </View>
    );
};

export default AmplifySignOut;
