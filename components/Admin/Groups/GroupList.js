import { FlatList } from 'react-native';

import GroupItem from './GroupItem';

function renderGroupItem(itemData) {
    return <GroupItem {...itemData.item} />;
}

function GroupList({ groups }) {
    return (
        <FlatList
            data={groups.groups}
            renderItem={renderGroupItem}
            keyExtractor={(group) => group.groupId}
        />
    );
}

export default GroupList;
