import { FlatList } from 'react-native';

import MeetingItem from './MeetingItem';

function renderMeetingItem(itemData) {
    return <MeetingItem {...itemData.item} />;
}

function MeetingList({ meetings }) {
    return (
        <FlatList
            data={meetings.meetings}
            renderItem={renderMeetingItem}
            keyExtractor={(meeting) => meeting.meetingId}
        />
    );
}

export default MeetingList;
