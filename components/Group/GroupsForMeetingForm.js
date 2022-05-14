import React from 'react';
import { Text, View, FlatList } from 'react-native';
import { useQuery } from 'react-query';
import LoadingOverlay from '../ui/LoadingOverlay';
import GroupListItem from './GroupListItem';
import { fetchGroupsForMeeting } from '../../providers/groups';
function GroupsForMeetingForm({ meetingId, groupsFound }) {
    function renderGroupItem(itemData) {
        return <GroupListItem {...itemData.item} />;
    }
    console.log('groupsFound', groupsFound);
    const { data, status } = useQuery(['meetingGroups', status], () =>
        fetchGroupsForMeeting(meetingId)
    );
    if (status === 'loading') {
        return <LoadingOverlay />;
    } else if (status === 'error') {
        console.log('ERROR getting active meetings');
        return (
            <>
                <View>
                    <Text>We got an error</Text>
                </View>
                <View>
                    <Text>{status}</Text>
                </View>
                <View>
                    <Text>{data}</Text>
                </View>
            </>
        );
    } else {
        //===============================
        // we could get a success with no
        // groups
        //===============================
        if (data.status === '400') {
            return (
                <View>
                    <Text> No Groups</Text>
                </View>
            );
        } else {
            return (
                <>
                    <FlatList
                        data={data.body}
                        renderItem={renderGroupItem}
                        keyExtractor={(group) => group.groupId}
                    />
                </>
            );
        }
    }
}

export default GroupsForMeetingForm;
