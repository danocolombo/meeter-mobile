import axios from 'axios';
import { MEETER_API } from '@env';
import { subtractMonths, getToday } from '../util/date';
import { useDispatch } from 'react-redux';
import { printObject } from '../util/helpers';
const config = {
    headers: {
        'Access-Control-Allow-Headers':
            'Content-Type, x-auth-token, Access-Control-Allow-Headers',
        'Content-Type': 'application/json',
    },
};
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

    let res = await axios.post(api2use, body, config);

    if (res.status === 200) {
        return res.data.body;
        console.log('data received.');
    } else {
        console.log('we got no meetings');
        return null;
    }
}

export async function getAllActiveMeetingsForClient(client, startDate) {
    const config = {
        headers: {
            'Access-Control-Allow-Headers':
                'Content-Type, x-auth-token, Access-Control-Allow-Headers',
            'Content-Type': 'application/json',
        },
    };
    let obj = {
        operation: 'getMeetingsOnAfterDate',
        payload: {
            clientId: client,
            date: startDate,
            direction: 'ASC',
        },
    };

    let body = JSON.stringify(obj);
    let api2use = MEETER_API + '/meetings';

    let res = await axios.post(api2use, body, config);

    var returnValue = res.data.body.Items;
    if (res.status === 200) {
        return returnValue;
    } else {
        console.log('we got no meetings');
        return null;
    }
}

export async function getMeetingsBetweenDates(
    client,
    startDate,
    stopDate,
    direction
) {
    const config = {
        headers: {
            'Access-Control-Allow-Headers':
                'Content-Type, x-auth-token, Access-Control-Allow-Headers',
            'Content-Type': 'application/json',
        },
    };
    let obj = {
        operation: 'getMeetingsBetweenDates',
        payload: {
            clientId: client,
            startDate: startDate,
            stopDate: stopDate,
            direction: direction,
        },
    };

    let body = JSON.stringify(obj);
    let api2use = MEETER_API + '/meetings';
    let res = await axios.post(api2use, body, config);
    var returnValue = res.data.body.Items;
    if (res.status === 200) {
        return returnValue;
    } else {
        console.log('we got no meetings');
        return null;
    }
}
export const fetchActiveMeetings = async () => {
    const today = getToday();
    const config = {
        headers: {
            'Access-Control-Allow-Headers':
                'Content-Type, x-auth-token, Access-Control-Allow-Headers',
            'Content-Type': 'application/json',
        },
    };
    let obj = {
        operation: 'getMeetingsOnAfterDate',
        payload: {
            clientId: 'wbc',
            date: today,
            direction: 'ASC',
        },
    };

    let body = JSON.stringify(obj);
    let api2use = MEETER_API + '/meetings';

    let res = await axios.post(api2use, body, config);
    // console.log('meetings:\n', res.data);
    return res.data;
};
export const fetchHistoricMeetings = async () => {
    //------------------------------
    // need to get two months back
    //==============================
    let twoMonthsAgo = subtractMonths(2).toJSON();

    let startDate = twoMonthsAgo.slice(0, 10);
    let target = getToday();
    const historicMeetings = await getMeetingsBetweenDates(
        'wbc',
        startDate,
        target,
        'DESC'
    );
    return historicMeetings;
};
export const deleteMeeting = async (meetingId) => {
    let obj = {
        operation: 'deleteMeeting',
        payload: {
            Key: {
                meetingId: meetingId,
            },
        },
    };

    let body = JSON.stringify(obj);
    let api2use = MEETER_API + '/meetings';

    let res = await axios.post(api2use, body, config);

    var returnValue = res.data.body;
    if (res.status === 200) {
        return returnValue;
    } else {
        console.log('we got no meetings');
        return null;
    }
};
export const addMeeting = async (newMeeting) => {
    console.log('new meeting being added:\n', newMeeting);
    let obj = {
        operation: 'putMeeting',
        payload: {
            Item: newMeeting,
        },
    };

    let body = JSON.stringify(obj);
    let api2use = MEETER_API + '/meetings';

    let res = await axios.post(api2use, body, config);
    printObject('our db response', res);
    var returnValue = res.data.body;
    if (res.status === 200) {
        return returnValue;
    } else {
        console.log('we got no meetings');
        return null;
    }
};
