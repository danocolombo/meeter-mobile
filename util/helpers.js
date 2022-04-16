import * as Crypto from 'expo-crypto';
export function dateIsBeforeToday(testDate) {
    // let testDate = '2022-01-15';

    let target = testDate.split('-');

    let tYear = parseInt(target[0]);
    // return true;
    let tMonth = parseInt(target[1]);
    let tDay = parseInt(target[2]);

    var todayDate = new Date().toISOString().slice(0, 10);
    let standard = todayDate.toString().split('-');
    let sYear = parseInt(standard[0]);
    let sMonth = parseInt(standard[1]);
    let sDay = parseInt(standard[2]);
    let results = null;
    let spot = 0;
    if (tYear < sYear) {
        spot = 1;
        results = true;
    } else if (tYear === sYear && tMonth < sMonth) {
        spot = 2;
        results = true;
    } else if (tYear === sYear && tMonth === sMonth && tDay < sDay) {
        spot = 3;
        results = true;
    } else {
        spot = 4;
        results = false;
    }
    return results;
}
export async function getUniqueId() {
    let uniqueValue = null;
    await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA256,
        new Date().toString() + Math.random().toString()
    )
        .then((result) => {
            console.log('result:' + result);
            return result;
        })
        .catch(() => {
            console.log('failure');
        });
}
