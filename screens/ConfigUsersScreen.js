import axios from 'axios';
import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../store/auth-context';
import { MeeterContext } from '../store/meeter-context';
import { StyleSheet, Text, View } from 'react-native';
import { getConfigurations } from '../providers/configs';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import UsersOutput from '../components/Admin/Users/UsersOutput';

function ConfigUsersScreen() {
    const [isLoading, setIsLoading] = useState(false);
    const [fetchedMessage, setFetchedMessage] = useState();
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
        const fetchConfigs = async () => {
            setIsLoading(true);
            const data = await getConfigurations('wbc');

            meeterCtx.loadConfigurations(data);
            setIsLoading(false);
        };
        fetchConfigs()
            .then(() => {
                //isLoading.current = false;
            })
            .catch(console.error);
    }, []);

    return (
        <>
            {isLoading ? (
                <LoadingOverlay />
            ) : (
                <>
                    <View style={styles.rootContainer}>
                        <Text style={styles.title}>USERS</Text>
                        <View style={styles.listContainer}>
                            <UsersOutput
                                users={meeterCtx.configuration.users}
                            />
                        </View>
                    </View>
                </>
            )}
        </>
    );
}

export default ConfigUsersScreen;

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        alignItems: 'center',
    },
    listContainer: {
        flexDirection: 'row',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 8,
        marginTop: 16,
    },
});
