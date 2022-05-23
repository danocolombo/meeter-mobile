import axios from 'axios';
import { MEETER_API } from '@env';
import { printObject } from '../util/helpers';
const config = {
    headers: {
        'Access-Control-Allow-Headers':
            'Content-Type, x-auth-token, Access-Control-Allow-Headers',
        'Content-Type': 'application/json',
    },
};
export async function getAllGroups(id) {
    const config = {
        headers: {
            'Access-Control-Allow-Headers':
                'Content-Type, x-auth-token, Access-Control-Allow-Headers',
            'Content-Type': 'application/json',
        },
    };
    let obj = {
        operation: 'getAllGroupsForClient',
        payload: {
            clientId: id,
        },
    };
    let body = JSON.stringify(obj);
    let api2use = MEETER_API + '/groups';

    let res = await axios.post(api2use, body, config);

    if (res.status === 200) {
        return res.data.body;
    } else {
        console.log('we got no groups');
        return null;
    }
}
export async function getGroupsAfterCompKey(id, grpCompKey, direction) {
    const config = {
        headers: {
            'Access-Control-Allow-Headers':
                'Content-Type, x-auth-token, Access-Control-Allow-Headers',
            'Content-Type': 'application/json',
        },
    };
    let obj = {
        operation: 'getGroupsAfterCompKey',
        payload: {
            clientId: id,
            grpCompKey: grpCompKey,
            direction: direction,
        },
    };
    let body = JSON.stringify(obj);
    let api2use = MEETER_API + '/groups';

    let res = await axios.post(api2use, body, config);

    if (res.status === 200) {
        return res.data.body;
    } else {
        console.log('we got no groups');
        return null;
    }
}
export const fetchGroupsForMeeting = async (grpCompKey) => {
    // const config = {
    //     headers: {
    //         'Access-Control-Allow-Headers':
    //             'Content-Type, x-auth-token, Access-Control-Allow-Headers',
    //         'Content-Type': 'application/json',
    //     },
    // };
    let obj = {
        operation: 'getGroupsByGroupCompKey',
        payload: {
            grpCompKey: grpCompKey,
        },
    };

    let body = JSON.stringify(obj);
    let api2use = MEETER_API + '/groups';
    let res = await axios.post(api2use, body, config);
    // printObject('res.data.body.Items', res.data.body.Items);
    return res.data.body.Items;
};
export const addGroup = async (newGroup) => {
    let obj = {
        operation: 'addGroup',
        payload: {
            Item: newGroup,
        },
    };

    let body = JSON.stringify(obj);
    let api2use = MEETER_API + '/groups';

    let res = await axios.post(api2use, body, config);
    var returnValue = res.data.Item;
    if (res.status === 200) {
        return returnValue;
    } else {
        console.log('we got no groups');
        return null;
    }
};
