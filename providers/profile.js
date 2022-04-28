import axios from 'axios';
import { MEETER_API } from '@env';

export async function getProfile(id) {
    const config = {
        headers: {
            'Access-Control-Allow-Headers':
                'Content-Type, x-auth-token, Access-Control-Allow-Headers',
            'Content-Type': 'application/json',
        },
    };
    let obj = {
        operation: 'authenticate',
        payload: {
            userId: id,
        },
    };
    let body = JSON.stringify(obj);

    let api2use = MEETER_API + '/user';
    let res = await axios.post(api2use, body, config);

    if (res.status === 200) {
        return res.data.body;
    } else {
        console.log('we got no profile');
        return null;
    }
}

// export function createUser(email, password) {
//     return authenticate('signUp', email, password);
// }

// export function login(email, password) {
//     return authenticate('signInWithPassword', email, password);
// }
