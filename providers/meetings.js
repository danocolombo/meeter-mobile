import axios from 'axios';
import { MEETER_API } from '@env';

export async function getAllMeetings(id) {
    const config = {
        headers: {
            'Access-Control-Allow-Headers':
                'Content-Type, x-auth-token, Access-Control-Allow-Headers',
            'Content-Type': 'application/json',
        },
    };
    let obj = {
        operation: 'getAllMeetings',
        payload: {
            clientId: id,
        },
    };
    let body = JSON.stringify(obj);
    let api2use = MEETER_API + '/meetings';
    console.log('request:\n', body);
    let res = await axios.post(api2use, body, config);

    if (res.status === 200) {
        return res.data.body;
        console.log('data received.');
    } else {
        console.log('we got no meetings');
        return null;
    }
}
