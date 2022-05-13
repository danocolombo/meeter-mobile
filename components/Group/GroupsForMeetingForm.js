import React from 'react';
import { Text, View, FlatList } from 'react-native';
import GroupListItem from './GroupListItem';
function GroupsForMeetingForm({ meetingId, groupsFound }) {
    function renderGroupItem(itemData) {
        return <GroupListItem {...itemData.item} />;
    }
    return (
        <>
            <View>
                <Text>meetingId:{meetingId}</Text>
            </View>
            <FlatList
                data={groupsFound}
                renderItem={renderGroupItem}
                keyExtractor={(group) => group.groupId}
            />
        </>
    );
}

export default GroupsForMeetingForm;
