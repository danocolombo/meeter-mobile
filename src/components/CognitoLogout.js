import React from 'react';
import { View, Text, Button } from 'react-native';
import { Auth } from 'aws-amplify';
function LogoutScreen() {
    return (
        <View>
            <Text>Are you sure you want to logout?</Text>
            <Button onClick={Auth.signOut} title='Logout'>
                Sign out
            </Button>
        </View>
    );
}

export default LogoutScreen;
