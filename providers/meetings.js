import axios from 'axios';
import { MEETER_API } from '@env';
import { subtractMonths, getToday } from '../util/date';

const headers = {
    headers: {
        'Access-Control-Allow-Headers':
            'Content-Type, x-auth-token, Access-Control-Allow-Headers',
        'Content-Type': 'application/json',
    },
};
export async function getAllMeetings(id) {
    let obj = {
        operation: 'getAllMeetings',
        payload: {
            clientId: id,
        },
    };
    let body = JSON.stringify(obj);
    let api2use = MEETER_API + '/meetings';

    let res = await axios.post(api2use, body, headers);

    if (res.status === 200) {
        return res.data.body;
        console.log('data received.');
    } else {
        console.log('we got no meetings');
        return null;
    }
}

export async function getAllActiveMeetingsForClient(client, startDate) {
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

    let res = await axios.post(api2use, body, headers);

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
    let res = await axios.post(api2use, body, headers);
    var returnValue = res.data.body.Items;
    if (res.status === 200) {
        return returnValue;
    } else {
        console.log('we got no meetings');
        return null;
    }
}
export const fetchActiveMeetings = async () => {
    const tDay = getToday();

    let obj = {
        operation: 'getMeetingsOnAfterDate',
        payload: {
            clientId: 'wbc',
            date: tDay,
            direction: 'ASC',
        },
    };

    let body = JSON.stringify(obj);
    let api2use = MEETER_API + '/meetings';

    let res = await axios.post(api2use, body, headers);
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
//   ===============================
//   deleteMeeting(meetingId)
//   ===============================
export const deleteMeeting = async (meetingId) => {
    let obj = {
        operation: 'deleteMeeting',
        payload: {
            meetingId: meetingId,
        },
    };

    let body = JSON.stringify(obj);
    let api2use = MEETER_API + '/meetings';

    let res = await axios.post(api2use, body, headers);
    return res.data;
};
