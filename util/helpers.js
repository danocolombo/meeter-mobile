export function dateIsBeforeToday(testDate) {
    // let testDate = '2022-01-15';
    let target = testDate.split('-');
    tYear = parseInt(target[0]);
    tMonth = parseInt(target[1]);
    tDay = parseInt(target[2]);

    var todayDate = new Date().toISOString().slice(0, 10);
    let standard = todayDate.toString().split('-');
    sYear = parseInt(standard[0]);
    sMonth = parseInt(standard[1]);
    sDay = parseInt(standard[2]);
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
    console.log('spot:' + spot);
    console.log('target is before standard:' + results);
}
