import axios from 'axios';
import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../store/auth-context';
import { MeeterContext } from '../store/meeter-context';
import { StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getConfigurations } from '../providers/configs';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import Button from '../components/ui/Button';
import GroupsOutput from '../components/Admin/Groups/GroupsOutput';

function ConfigUsersScreen() {
    const navigation = useNavigation();
    const [isLoading, setIsLoading] = useState(false);
    const [fetchedMessage, setFetchedMessage] = useState();
    const [defaultGroups, setDefaultGroups] = useState();
    const authCtx = useContext(AuthContext);
    const meeterCtx = useContext(MeeterContext);
    const token = authCtx.token;
    useEffect(() => {
        axios
            .get(
                'https://react-native-max-2022-default-rtdb.firebaseio.com/message.json?auth=' +
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
    useEffect(() => {
        setDefaultGroups(meeterCtx.configuration.groups);
    }, [meeterCtx.configuration.groups]);
    function addNewDefaultGroupHandler() {
        console.log('click');
        navigation.navigate('DefaultGroupConfig', {
            groupId: '0',
            gender: '',
            title: '',
            location: '',
            facilitator: '',
        });
    }

    return (
        <>
            {isLoading ? (
                <LoadingOverlay />
            ) : (
                <>
                    <View style={styles.rootContainer}>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}
                        >
                            <View
                                style={{
                                    flex: 1,
                                    alignItems: 'center',
                                    marginLeft: 30,
                                }}
                            >
                                <Text style={styles.title}>DEFAULT GROUPS</Text>
                            </View>
                            <View
                                style={{
                                    flexDirection: 'column',
                                    marginRight: 20,
                                }}
                            >
                                <Button
                                    onPress={addNewDefaultGroupHandler}
                                    customStyle={{ backgroundColor: 'green' }}
                                >
                                    +
                                </Button>
                            </View>
                        </View>
                        <View style={styles.listContainer}>
                            <GroupsOutput groups={defaultGroups} />
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
