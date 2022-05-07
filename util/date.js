export function getFormattedDate(date) {
    return date.toISOString().slice(0, 10);
}

export function getDateMinusDays(date, days) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days);
}
export function subtractMonths(numOfMonths, date = new Date()) {
    date.setMonth(date.getMonth() - numOfMonths);

    return date;
}
export function isMeetingDateBeforeToday(meetingDate) {
    let datePart = meetingDate.split('-');
    //need to increment month
    let mo = parseInt(datePart[1] - 1);
    let mDate = new Date(parseInt(datePart[0]), mo, parseInt(datePart[2]));
    let testDate = new Date(mDate.toDateString());
    return testDate < new Date(new Date().toDateString());
}
