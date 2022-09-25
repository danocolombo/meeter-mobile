import { FlatList } from 'react-native';

import UserItem from './UserItem';

function renderUserItem(itemData) {
    return <UserItem {...itemData.item} />;
}

function UserList({ users }) {
    return (
        <FlatList
            data={users.users}
            renderItem={renderUserItem}
            keyExtractor={(user) => user.userId}
        />
    );
}

export default UserList;
