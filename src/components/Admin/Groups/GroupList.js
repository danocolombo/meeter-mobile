import React, { useContext } from 'react';
import { FlatList } from 'react-native';
import { MeeterContext } from '../../../store/meeter-context';
import GroupItem from './GroupItem';

function renderGroupItem(itemData) {
    return <GroupItem {...itemData.item} />;
}

function GroupList({ groups }) {
    const meeterCtx = useContext(MeeterContext);
    return (
        <FlatList
            extraData={meeterCtx.configuration.groups}
            data={groups.groups}
            renderItem={renderGroupItem}
            keyExtractor={(group) => group.groupId}
        />
    );
}

export default GroupList;
