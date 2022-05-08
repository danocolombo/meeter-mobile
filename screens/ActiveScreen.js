import axios from 'axios';
import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../store/auth-context';
import { MeetingsContext } from '../store/meeting-context';
import { GroupsContext } from '../store/groups-context';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import MeetingsOutput from '../components/Meeting/MeetingsOutput';
import NextMeetingCard from '../components/Meeting/NextMeetingCard';
import {
    getAllMeetings,
    getAllActiveMeetingsForClient,
    getMeetingsBetweenDates,
} from '../providers/meetings';
import { subtractMonths } from '../util/date';
import { getGroupsAfterCompKey } from '../providers/groups';
import { StyleSheet, Text, View } from 'react-native';
import { GOOGLE_AUTH } from '@env';

function ActiveScreen() {
    const [isLoading, setIsLoading] = useState(false);
    const [activeMeetings, setActiveMeetings] = useState([]);
    const [historicMeetings, setHistoricMeetings] = useState([]);
    const [fetchedMessage, setFetchedMessage] = useState();
    const authCtx = useContext(AuthContext);
    const meetingsCtx = useContext(MeetingsContext);
    const groupsCtx = useContext(GroupsContext);
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
        if (
            meetingsCtx.activeMeetings.length === undefined ||
            meetingsCtx.activeMeetings.length < 1
        ) {
            setIsLoading(true);
            var d = new Date();
            d.setDate(d.getDate() - 1); // date - one
            const dminusone = d.toLocaleString(); //  M/DD/YYYY, H:MM:SS PM
            let datetime = dminusone.split(', '); // M/DD/YYYY
            const dateparts = datetime[0].split('/');
            const yr = dateparts[2];
            const mn = dateparts[0] < 10 ? '0' + dateparts[0] : dateparts[0];
            const da = dateparts[1] < 10 ? '0' + dateparts[1] : dateparts[1];
            const target = yr + '-' + mn + '-' + da;

            const getTheData = async () => {
                const futureMeetings = await getAllActiveMeetingsForClient(
                    'wbc',
                    target
                );
                meetingsCtx.activeMeetings = futureMeetings;
                setActiveMeetings(futureMeetings);
            };
            getTheData()
                .then(() => {
                    const getHistory = async () => {
                        //------------------------------
                        // need to get two months back
                        //==============================
                        let twoMonthsAgo = subtractMonths(2).toJSON();

                        let startDate = twoMonthsAgo.slice(0, 10);
                        const historicMeetings = await getMeetingsBetweenDates(
                            'wbc',
                            startDate,
                            target,
                            'DESC'
                        );
                        meetingsCtx.historicMeetings = historicMeetings;
                        setHistoricMeetings(historicMeetings);
                    };
                    getHistory().then(() => {
                        const getGroupData = async () => {
                            const realGroups = await getGroupsAfterCompKey(
                                'wbc',
                                'wbc#2022#',
                                'ASC'
                            );

                            groupsCtx.saveGroups(realGroups.Items);
                        };
                        getGroupData()
                            .then(() => {
                                // console.log('loaded');
                            })
                            .catch(console.error);
                    });
                })
                .catch(console.error);
            setIsLoading(false);
        }
    }, []);
    return (
        <>
            {isLoading ? (
                <LoadingOverlay />
            ) : (
                // <View style={styles.rootContainer}>
                //     <NextMeetingCard nextMeeting={activeMeetings[0]} />
                //     <Text style={styles.title}>Welcome!</Text>
                //     <MeetingsOutput meetings={activeMeetings} />
                // </View>
                <View>
                    <Text>TESTING</Text>
                </View>
            )}
        </>
    );
}

export default ActiveScreen;

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
