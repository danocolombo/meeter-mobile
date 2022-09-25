import axios from 'axios';
import { useEffect, useState, useContext, useRef } from 'react';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { AuthContext } from '../store/auth-context';
import { MeeterContext } from '../store/meeter-context';
import { StyleSheet, Text, View } from 'react-native';
import ProfileForm from '../components/profile/ProfileForm';
import { getProfile } from '../providers/profile';

function ProfileSceen() {
    const [isLoading, setIsLoading] = useState(false);
    const [fetchedMessage, setFetchedMessage] = useState();
    const [profileInfo, setProfileInfo] = useState('');
    const authCtx = useContext(AuthContext);
    const meeterCtx = useContext(MeeterContext);
    const token = authCtx.token;

    useEffect(() => {
        axios
            .get(
                'https://meeter7-app-default-rtdb.firebaseio.com/message.json?auth=' +
                    token
            )
            .then((response) => {
                setFetchedMessage(response.data);
            });
    }, [token]);

    useEffect(() => {
        let id = '64a77165-a946-4b34-b68a-1654f1cd3ccd';
        const fetchData = async () => {
            setIsLoading(true);
            // get profile from database
            const data = await getProfile(id);
            meeterCtx.updateProfile(data);
            setIsLoading(false);
            // console.log('course:\n', meeterCtx.configuration);
        };

        // call the function
        fetchData()
            .then(() => {
                isLoading.current = false;
            })
            // make sure to catch any error
            .catch(console.error);
    }, []);

    return (
        <>
            {isLoading ? (
                <LoadingOverlay />
            ) : (
                <View style={styles.rootContainer}>
                    <ProfileForm />
                </View>
            )}
        </>
    );
}

export default ProfileSceen;

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'center',
        padding: 32,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 8,
    },
});
