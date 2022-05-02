import axios from 'axios';
import { MEETER_API } from '@env';

export async function getConfigurations({ client }) {
    const config = {
        headers: {
            'Access-Control-Allow-Headers':
                'Content-Type, x-auth-token, Access-Control-Allow-Headers',
            'Content-Type': 'application/json',
        },
    };
    let obj = {
        operation: 'getClient',
        payload: {
            clientId: 'wbc',
        },
    };
    let body = JSON.stringify(obj);

    let api2use = MEETER_API + '/client';
    let res = await axios.post(api2use, body, config);

    if (res.status === 200) {
        return res.data.Items[0];
    } else {
        console.log('we got no client profile');
        return null;
    }
}
